//
//  ViewController.swift
//  GPT
//
//  Created by Guðmundur Ómarsson on 29.12.2024.
//

import Cocoa
import SafariServices
import WebKit

let extensionBundleIdentifier = "com.lithium.is.GPT.Extension"

class ViewController: NSViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self
        self.webView.configuration.userContentController.add(self, name: "controller")
        
        // Copy app icon from assets to resources
        if let resourcePath = Bundle.main.resourcePath {
            let iconDest = "\(resourcePath)/AppIcon.png"
            
            // Only copy if it doesn't exist
            if !FileManager.default.fileExists(atPath: iconDest) {
                if let image = NSImage(named: "AppIcon"),
                   let tiffData = image.tiffRepresentation,
                   let bitmap = NSBitmapImageRep(data: tiffData),
                   let pngData = bitmap.representation(using: .png, properties: [:]) {
                    try? pngData.write(to: URL(fileURLWithPath: iconDest))
                }
            }
        }
        
        // Load the main HTML file
        if let url = Bundle.main.url(forResource: "Main", withExtension: "html") {
            self.webView.loadFileURL(url, allowingReadAccessTo: Bundle.main.resourceURL!)
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.body as? String == "open-preferences" {
            SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
                DispatchQueue.main.async {
                    NSApplication.shared.terminate(nil)
                }
            }
        }
    }
}

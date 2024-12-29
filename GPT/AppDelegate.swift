//
//  AppDelegate.swift
//  GPT
//
//  Created by Guðmundur Ómarsson on 29.12.2024.
//

import Cocoa
import SafariServices

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Check if Safari extension is enabled
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: "com.lithium.is.GPT.Extension") { (state, error) in
            guard let state = state, error == nil else {
                // Handle error or extension not found
                print("Error getting extension state:", error?.localizedDescription ?? "unknown error")
                return
            }
            
            if !state.isEnabled {
                // Prompt user to enable extension
                SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.lithium.is.GPT.Extension") { error in
                    if let error = error {
                        print("Error showing preferences:", error.localizedDescription)
                    }
                }
            }
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
    
    func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
        return true
    }
}

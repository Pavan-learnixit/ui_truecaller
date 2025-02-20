package com.awesomeproject

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CallDetectionModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CallDetectionModule"
    }

    @ReactMethod
    fun requestOverlayPermission(promise: Promise) {
        try {
            if (!Settings.canDrawOverlays(reactContext)) {
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + reactContext.packageName)
                )
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactContext.startActivity(intent)
                promise.resolve("Overlay permission requested")
            } else {
                promise.resolve("Overlay permission already granted")
            }
        } catch (e: Exception) {
            promise.reject("ERR_REQUEST_PERMISSION", e)
        }
    }

    @ReactMethod
    fun testOverlay(promise: Promise) {
        try {
            val intent = Intent(reactContext, OverlayService::class.java).apply {
                putExtra("phoneNumber", "1234567890")
                putExtra("callType", "Test")
            }
            reactContext.startService(intent)
            promise.resolve("Test overlay started")
        } catch (e: Exception) {
            promise.reject("ERR_TEST_OVERLAY", e)
        }
    }

    @ReactMethod
    fun startCallDetection(promise: Promise) {
        try {
            // Here you could also dynamically register the receiver if needed.
            // For demonstration, we simply resolve with a success message.
            promise.resolve("Call detection started")
        } catch (e: Exception) {
            promise.reject("ERR_CALL_DETECTION", e)
        }
    }
}

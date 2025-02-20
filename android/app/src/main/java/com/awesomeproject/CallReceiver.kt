package com.awesomeproject

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import android.util.Log

class CallReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        Log.d("CallReceiver", "Received intent: ${intent.action}")
        when (intent.action) {
            // Incoming call detection
            "android.intent.action.PHONE_STATE" -> {
                val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
                Log.d("CallReceiver", "Phone state: $state")
                if (state == TelephonyManager.EXTRA_STATE_RINGING) {
                    val incomingNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)
                    // Launch overlay service with call details
                    Log.d("CallReceiver", "Incoming number: $incomingNumber")
                    showOverlay(context, incomingNumber, "Incoming")
                } 
            }
            // Outgoing call detection
            "android.intent.action.NEW_OUTGOING_CALL" -> {
                val outgoingNumber = intent.getStringExtra(Intent.EXTRA_PHONE_NUMBER)
                Log.d("CallReceiver", "Outgoing number: $outgoingNumber")
                showOverlay(context, outgoingNumber, "Outgoing")
            }
        }
    }

    private fun showOverlay(context: Context, phoneNumber: String?, callType: String) {
        val serviceIntent = Intent(context, OverlayService::class.java).apply {
            putExtra("phoneNumber", phoneNumber)
            putExtra("callType", callType)
        }
        context.startService(serviceIntent)
    }
}

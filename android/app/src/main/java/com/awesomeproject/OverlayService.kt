package com.awesomeproject

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView
import androidx.core.app.NotificationCompat

class OverlayService : Service() {

    private var windowManager: WindowManager? = null
    private var overlayView: View? = null
    private val channelId = "overlay_service_channel"

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        // Create notification channel and start foreground service for Android O and above.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelName = "Overlay Service Channel"
            val channel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_LOW)
            val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
            val notification: Notification = NotificationCompat.Builder(this, channelId)
                .setContentTitle("Overlay Service")
                .setContentText("Call overlay is active")
                .setSmallIcon(R.drawable.ic_launcher)  // Replace with your app icon
                .build()
            startForeground(1, notification)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val phoneNumber = intent?.getStringExtra("phoneNumber") ?: "Unknown"
        val callType = intent?.getStringExtra("callType") ?: "Call"
        Log.d("OverlayService", "onStartCommand: $callType - $phoneNumber")

        if (overlayView == null) {
            overlayView = LayoutInflater.from(this).inflate(R.layout.overlay_layout, null)

            val params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                else
                    WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT
            ).apply {
                gravity = Gravity.TOP or Gravity.CENTER_HORIZONTAL
                x = 0
                y = 100 // Adjust vertical position as needed
            }

            overlayView?.findViewById<TextView>(R.id.tvNumber)?.text = phoneNumber
            overlayView?.findViewById<TextView>(R.id.tvCallType)?.text = callType

            // Close button to allow user to dismiss the overlay.
            overlayView?.findViewById<Button>(R.id.btnClose)?.setOnClickListener {
                Log.d("OverlayService", "Close button clicked")
                stopSelf()
            }

            try {
                windowManager?.addView(overlayView, params)
                Log.d("OverlayService", "Overlay view added")
            } catch (e: Exception) {
                Log.e("OverlayService", "Error adding overlay view", e)
            }
        } else {
            // Update overlay text if already visible.
            overlayView?.findViewById<TextView>(R.id.tvNumber)?.text = phoneNumber
            overlayView?.findViewById<TextView>(R.id.tvCallType)?.text = callType
        }
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        overlayView?.let {
            windowManager?.removeView(it)
        }
        overlayView = null
    }

    override fun onBind(intent: Intent?): IBinder? = null
}

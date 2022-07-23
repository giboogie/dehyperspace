package com.dehyperlabs.dehyperspace;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.cboy.rn.splashscreen.SplashScreen;
public class MainActivity extends ReactActivity { 
  @Override 
  protected void onCreate(Bundle savedInstanceState) {
     SplashScreen.show(this); // here 
     super.onCreate(savedInstanceState); 
     } // ...other code 
}


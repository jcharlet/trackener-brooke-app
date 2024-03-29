package com.trackenerbrookeapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.sadcoat.logentries.LogentriesReactPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.bugsnag.BugsnagReactNative;
import com.oblador.keychain.KeychainPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LogentriesReactPackage(),
            new ReactNativePermissionsPackage(),
            BugsnagReactNative.getPackage(),
            new KeychainPackage(),
            new LocationServicesDialogBoxPackage(),
            new BackgroundTimerPackage(),
            new ReactNativeConfigPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}

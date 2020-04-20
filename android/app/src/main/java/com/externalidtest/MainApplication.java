package com.externalidtest;

import android.app.Application;
import android.util.Log;

import com.RNpublic.neuraintegration.NeuraIntegrationSingleton;
import com.appboy.AppboyLifecycleCallbackListener;
import com.appboy.support.AppboyLogger;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.neura.standalonesdk.service.NeuraApiClient;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    AppboyLogger.setLogLevel(Log.VERBOSE);

    registerActivityLifecycleCallbacks(new AppboyLifecycleCallbackListener());
    //Appboy.getInstance(getApplicationContext()).getCurrentUser().addAlias("braze-user-2", "identify-braze-user");

    NeuraApiClient mNeuraApiClient = NeuraApiClient.getClient(getApplicationContext(), "us-5241aa9a72869ae0c61838d0974dcf8db43f3cec0c1ec0208d7fa4e7c28459ba", "ce26018ca02561a762083f6df0505f0ef8287cef201c9a5fc9f686e1552a2f82");

    NeuraIntegrationSingleton.getInstance().setNeuraApiClient(mNeuraApiClient);

    SoLoader.init(this, /* native exopackage */ false);
  }
}

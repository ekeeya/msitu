package com.rtnmsitu;

import MsituModule

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap;

class MsituPackage : TurboReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == MsituModule.NAME) {
        MsituModule(reactContext)
    } else {
        null
    }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos = HashMap<String, ReactModuleInfo>()
            moduleInfos[MsituModule.NAME] = ReactModuleInfo(
                    MsituModule.NAME,
                    MsituModule.NAME,
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true, // hasConstants
                    false, // isCxxModule
                    true // isTurboModule
            )
            moduleInfos
        }
    }
}
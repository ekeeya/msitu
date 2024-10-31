import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import com.rtnmsitu.NativeRTNMsituSpec
import com.rtnmsitu.utils.ComplexObject
import com.rtnmsitu.utils.ObjectMapper
import com.rtnmsitu.s2.S2Helper

@ReactModule(name = "RTNMsitu")
class MsituModule(reactContext: ReactApplicationContext) : NativeRTNMsituSpec(reactContext) {
    override fun getName(): String {
        return NAME
    }

    override fun getComplexObject(promise: Promise) {
        val complexObject = ComplexObject(
            "123",
            "Example Name",
            listOf("Alias1", "Alias2", "Alias3")
        )

        val complexObjectMap = ObjectMapper.toWritableMap(complexObject)
        promise.resolve(complexObjectMap)
    }

    override fun getS2Point(promise: Promise) {
        try{
            val point = S2Helper.s2Point(-0.00999946643502502, 0.002592454260932412, 0.999946643502502)
            val map: WritableMap = Arguments.createMap().apply {
                putDouble("x", point.x)
                putDouble("y", point.y)
                putDouble("z", point.z)
            }
            promise.resolve(map)
        }catch (e:Exception){
            promise.reject("Error", e.message)
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    override fun getItem(): String {
        return "This is a primitive from the backend"
    }

    companion object {
        const val NAME = "RTNMsitu"
    }
}
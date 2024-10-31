package com.rtnmsitu.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class ComplexObjectConverter {
    public static WritableMap toWritableMap(ComplexObject complexObject) {
        WritableMap map = Arguments.createMap();
        map.putString("id", complexObject.getId());
        map.putString("name", complexObject.getName());

        // Convert aliases list to WritableArray
        WritableArray aliasesArray = Arguments.createArray();
        for (String alias : complexObject.getAliases()) {
            aliasesArray.pushString(alias);
        }
        map.putArray("aliases", aliasesArray);

        return map;
    }
}

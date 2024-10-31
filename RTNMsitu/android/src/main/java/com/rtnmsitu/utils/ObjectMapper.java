package com.rtnmsitu.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

public class ObjectMapper {
    public static WritableMap toWritableMap(Object object) {
        WritableMap map = Arguments.createMap();

        if (object == null) {
            return map;  // Return empty map if object is null
        }

        Field[] fields = object.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);  // Access private fields

            try {
                Object value = field.get(object);

                // Convert value based on its type
                if (value instanceof String) {
                    map.putString(field.getName(), (String) value);
                } else if (value instanceof Integer) {
                    map.putInt(field.getName(), (Integer) value);
                } else if (value instanceof Double) {
                    map.putDouble(field.getName(), (Double) value);
                } else if (value instanceof Boolean) {
                    map.putBoolean(field.getName(), (Boolean) value);
                } else if (value instanceof List) {
                    WritableArray array = Arguments.createArray();
                    for (Object item : (List<?>) value) {
                        if (item instanceof String) {
                            array.pushString((String) item);
                        } else if (item instanceof Integer) {
                            array.pushInt((Integer) item);
                        } else if (item instanceof Double) {
                            array.pushDouble((Double) item);
                        } else if (item instanceof Boolean) {
                            array.pushBoolean((Boolean) item);
                        } else if (item != null) {
                            array.pushMap(toWritableMap(item));  // Recursively convert objects
                        }
                    }
                    map.putArray(field.getName(), array);
                } else if (value instanceof Map) {
                    WritableMap innerMap = Arguments.createMap();
                    for (Map.Entry<?, ?> entry : ((Map<?, ?>) value).entrySet()) {
                        if (entry.getKey() instanceof String && entry.getValue() instanceof String) {
                            innerMap.putString((String) entry.getKey(), (String) entry.getValue());
                        }
                        // Add additional type checks if needed
                    }
                    map.putMap(field.getName(), innerMap);
                } else if (value != null) {
                    map.putMap(field.getName(), toWritableMap(value));  // Recursively convert objects
                }

            } catch (IllegalAccessException e) {
                e.printStackTrace();  // Log or handle exceptions if needed
            }
        }

        return map;
    }
}

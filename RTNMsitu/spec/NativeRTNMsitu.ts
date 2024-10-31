import { TurboModule, TurboModuleRegistry } from "react-native";


export interface ComplexObject {
    id: string;
    name: string;
    aliases: string[];
}

export interface S2Point{
    x: number;
    y: number;
    z: number;
}

export interface Spec extends TurboModule {
    getComplexObject(): Promise<ComplexObject>;
    getS2Point():Promise<S2Point>;
    getItem(): string | null;
}


export default TurboModuleRegistry.getEnforcing<Spec>(
    'RTNMsitu',
  ) as Spec;

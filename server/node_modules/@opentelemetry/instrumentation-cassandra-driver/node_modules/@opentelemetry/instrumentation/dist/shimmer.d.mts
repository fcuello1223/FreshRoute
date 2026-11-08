import { ShimWrapped } from "./types.mjs";
//#region src/shimmer.d.ts
declare const wrap: <Nodule extends object, FieldName extends keyof Nodule>(nodule: Nodule, name: FieldName, wrapper: (original: Nodule[FieldName], name: FieldName) => Nodule[FieldName]) => ShimWrapped | undefined;
declare const massWrap: <Nodule extends object, FieldName extends keyof Nodule>(nodules: Nodule[], names: FieldName[], wrapper: (original: Nodule[FieldName]) => Nodule[FieldName]) => void;
declare const unwrap: <Nodule extends object>(nodule: Nodule, name: keyof Nodule) => void;
declare const massUnwrap: <Nodule extends object>(nodules: Nodule[], names: (keyof Nodule)[]) => void;
//#endregion
export { massUnwrap, massWrap, unwrap, wrap };
//# sourceMappingURL=shimmer.d.mts.map
import {
  BodyMutable,
  ComponentMutable,
  ComponentProps,
  Point,
  InternalMutable,
  SoundProps,
  SoundMutable,
} from "../../types";
import { getRandomNumber, getValueMutableFunction } from "../../utils";
import { sound } from "./sound.sub-component";

export type EmptyProps<Data = unknown> = {
  initialData?: Data;
} & ComponentProps;

export type EmptyMutable<Data = unknown> = {} & ComponentMutable<
  ComponentProps,
  Data
>;

export const empty = <Data>(
  originalProps: EmptyProps<Data> = {},
): InternalMutable<EmptyMutable<Data>, false> => {
  const { label = "empty", position, initialData } = originalProps;
  const $props = structuredClone(originalProps);

  let $id = `${label}_${getRandomNumber(0, 100_000)}`;
  let $position: Point = {
    x: position?.x || 0,
    y: position?.y || 0,
  };
  let $angle = 0;
  let $label = label;
  let $body: BodyMutable;
  let $data = initialData ?? ({} as Data);
  let $soundList = new Map<string, SoundMutable>();

  const getId = () => $id;

  const getLabel = () => $label;
  const setLabel = (label: string) => ($label = label);

  const getBody = () => $body;
  const setBody = (body: BodyMutable) => {
    $body = body;
    $body.setPosition($position);
  };

  const setPosition = async (data) => {
    $position = await getValueMutableFunction<Point>(data, $position);
    $body?.setPosition($position);

    $soundList.forEach(($sound) => $sound.setPosition($position));
  };
  const getPosition = () => $body?.getPosition() || $position;

  const getAngle = () => $body?.getAngle() || $angle;
  const setAngle = async (data) => {
    $angle = await getValueMutableFunction<number>(data, getAngle());
    $body?.setAngle($angle);
  };

  const getData = <R = Data>(selector?: (data: Data) => R): R => {
    return selector ? selector($data) : ($data as unknown as R);
  };
  const setData = (data: Data | ((data: Data) => Data)) => {
    if (typeof data === "function") {
      $data = (data as (data: Data) => Data)($data);
    } else {
      $data = data;
    }
  };

  const addSound = async (key: string, soundData: SoundProps) => {
    const $sound = await sound(soundData);
    $sound.setPosition(getPosition());
    $soundList.set(key, $sound);
    return $sound;
  };
  const getSound = (key: string) => $soundList.get(key);

  const $getRaw = (): EmptyProps<Data> => ({
    id: $id,
    label: $label,
    position: getPosition(),
    angle: getAngle(),
    initialData: $data,
  });

  const $destroy = () => {
    $soundList.forEach(($sound) => $sound.stop());
  };

  return {
    getId,

    getLabel,
    setLabel,

    setBody,
    getBody,

    //position
    setPosition,
    setPositionX: async (data) => {
      $position.x = await getValueMutableFunction<number>(data, $position.x);
      $body?.setPosition($position);
      $soundList.forEach(($sound) => $sound.setPosition($position));
    },
    setPositionY: async (data) => {
      $position.y = await getValueMutableFunction<number>(data, $position.y);
      $body?.setPosition($position);
      $soundList.forEach(($sound) => $sound.setPosition($position));
    },
    getPosition,

    getAngle,
    setAngle,

    getFather: null,

    getData,
    setData,

    addSound,
    getSound,

    getProps: () => $props as any,

    $destroy,
    $getRaw,

    $mutable: false,
  };
};

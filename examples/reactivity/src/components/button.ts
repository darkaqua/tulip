import {Container, DisplayObjectMutable, Function} from "../../../../src/types";
import {container as containerComponent, graphics as graphicsComponent} from "../../../../src/components";
import {useEffect} from "../../../../src/render";
import {EventMode} from "../../../../src/enums";

type Mutable = {} & DisplayObjectMutable<Container>;

type Props = {
  label?: string
  color?: number
  size?: number
  onPress?: () => void
}

export const Button: Function<Props, Mutable> = ({
  label = 'button',
  color = 0x6897bb,
  size = 10,
  onPress = () => {}
}) => {
  const container = containerComponent({
    label,
    eventMode: EventMode.STATIC
  });

  useEffect(() => {
    console.log(`Hello from ${label}`)
  }, [])

  const circle = graphicsComponent({
    color,
  });
  circle.setCircle(size);
  container.add(circle);

  container.on("click", onPress);

  return container

}

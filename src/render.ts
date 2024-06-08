import {ContainerReactivity, Hook, UseEffectCB} from "./types";
import {compare} from "./utils/data.utils";

// Hooks vars
let hooks: Hook[];
let index = 0;
let forceUpdate;

const getHook = (value?: any): Hook => {
  let hook = hooks[index++];
  if (!hook) {
    hook = { value };
    hooks.push(hook);
  }

  return hook;
};

export const useReducer = (reducer, initialState) => {
  const hook = getHook(initialState);
  const update = forceUpdate;

  const dispatch = action => {
    if (typeof action === 'function') {
      action = action(hook.value);
    }

    hook.value = reducer(hook.value, action);
    update();
  };

  return [hook.value, dispatch];
};

export const useState = initialState => useReducer((_, v) => v, initialState);

export const useEffect = (cb: UseEffectCB, args = []) => {
  const hook = getHook();
  if (compare(hook.value, args)) {
    hook.value = args;
    hook.cb = cb;
  }
};

export const render = (component: Function, container: ContainerReactivity) => {
  const currentHooks = container.hooks || {};
  container.hooks = {};

  forceUpdate = () => render(component, container);
  hooks = currentHooks[container.uid] || [];
  index = 0;

  container.removeChildren()

  const _node = component();

  // Not sure...
  container.addChild(_node.getDisplayObject());

  container.hooks[container.uid] = hooks;

  // Hooks
  Object.values(container.hooks)
    .forEach((cHooks) =>
      cHooks.forEach(hook => {
          if (hook.cb) {
            hook.cleanup = hook.cb();
            hook.cb = undefined
          }
        }
      )
    );
};

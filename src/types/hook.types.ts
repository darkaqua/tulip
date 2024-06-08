export type Hook = {
  cb?: UseEffectCB
  cleanup?: (() => void) | void
  value: any
}

export type UseEffectCB = (() => () => void) | (() => void)

import { Ref } from "vue"

export interface PopupMessage {
  message: string
}

export const setErrorPopupMessage = (
  popup: Ref<PopupMessage>,
  message: string
): void => {
  popup.value.message = message
}

export const setSuccessPopupMessage = (
  popup: Ref<PopupMessage>,
  message: string
): void => {
  popup.value.message = message
}

export const clearPopupMessage = (popup: Ref<PopupMessage>): void => {
  popup.value.message = ""
}

import { defineExtensionMessaging } from '@webext-core/messaging'

export interface ProtocolMap {
  clickPoint: (data: [number, number]) => void
  openIssues: (url: string) => void
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>()

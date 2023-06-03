import eventsource from 'react-native-sse'
import PocketBase from 'pocketbase'

global.EventSource = eventsource

const api = new PocketBase('https://anonchat.fly.dev/')

export default api

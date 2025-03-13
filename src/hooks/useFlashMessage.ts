import eventBus from "../utils/bus";

export default function useFlashMessage() {
    const setFlashMessage = (msg: string , type: boolean) => {
        eventBus.emit('flash', {
            message: msg,
            type
        });
    }

    return { setFlashMessage };
}
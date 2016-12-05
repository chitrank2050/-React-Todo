import dispatcher from "../Dispatcher";
import * as $ from "jquery";
export function deleteTodos(id) {
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id,
    });
}
export function postTodos(text) {
    dispatcher.dispatch({
        type: "POST_TODO",
        text,
    })
}

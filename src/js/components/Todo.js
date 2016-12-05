import React from "react";
import TodoStore from "../stores/Todostore";
export default class Todo extends React.Component {
    constructor(props) {
        super();
        this.getTime = this.getTime.bind(this);
        this.state = {
            DAYS: "",
            HOURS: "",
            MIN: "",

        };
    }
    componentWillMount() {
        this.getTime();
    }
    deleteTodos() {
        TodoStore.deleteTodos(this.props.id);
    }
    getTime() {
        const date = new Date(this.props.on);
        const dateNow = new Date(Date.now());
        const hours = Math.floor(Math.floor(Math.floor((date - (dateNow)) / 1000) / 60) / 60);
        const days = Math.floor(hours / 24);
        const HOURS = hours % 24;
        const DAYs = days;
        const MIn = (Math.floor(Math.floor((date - (dateNow)) / 1000) / 60)) % 60;
        this.setState({ DAYS: DAYs, HOURS: HOURS, MIN: MIn });
    }


    render() {
        setInterval(this.getTime, 60000);
        const val = [
            "You still thinking to Start!!! hmmmm",
            "Atleast you are not 'still thinking' guy. 'Once begun a task is easy;half the work is done.",
            "'Well begun Half Done ....' ",
            "'It always seems impossible until it is done -Nelson Mandella'",
            "Yipeee!! you completed what seems to be impossible , Now focus on presenting it and keep an eye on deadline."
        ];
        const { text, on, status, completed } = this.props;
        const icon = completed == "true" ? "\u2714" : "\u2716";
        const thought = val[status];
        return ( < div class = "li col-md-12" >
            < button class = "btn btn-default btn-circle"
            onClick = { this.deleteTodos.bind(this) } > < i class = "glyphicon glyphicon-remove" > < /i></button >
            < blockquote class = "blockquote" >
            < p > < strong > { icon } < /strong>You have a Todo<strong>{text}</strong > with deadline of < strong > { on } < /strong>
            you are left with approx { this.state.DAYS }
            days { this.state.HOURS }
            hours and { this.state.MIN }
            minutes. < /p> < footer class = "blockquote-footer" > { thought } < /footer>

            < /blockquote> < /div>
        );
    }
}

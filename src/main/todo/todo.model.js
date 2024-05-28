export class TodoModel{
    constructor(id, content, isDone, createdDate){
        this.id = id
        this.content = content
        this.isDone = isDone
        this.createdDate = createdDate
    }
}

export class TodoDto{
    constructor(title, status){
        this.title = title
        this.status = status
    }
}

const status_Enum = {
    REACHED: "reached",
    UNREACHED: "unreached",
}
import { TodoItemIndexProps } from '../model/TodoIndex';
import { TodoItem, TodoItemStatus } from '../model/TodoItem';

export class TodoParser {
  props: TodoItemIndexProps;

  constructor(props: TodoItemIndexProps) {
    this.props = props;
  }

  async parseTasks(
    filePath: string,
    fileContents: string,
  ): Promise<TodoItem[]> {
    const pattern = /(-|\*) \[(\s|x)?\]\s(.*)/g;
    return [...fileContents.matchAll(pattern)].map(task =>
      this.parseTask(filePath, task),
    );
  }

  private parseTask(filePath: string, entry: RegExpMatchArray): TodoItem {
    // debugger;
    const todoItemOffset = 2; // Strip off `-|* `
    const status = entry[2] === 'x' ? TodoItemStatus.Done : TodoItemStatus.Todo;
    const description = entry[3];

    const dateMatches = description.match(this.props.dateRegexp);
    let actionDate = undefined;
    if (dateMatches != null) {
      if(dateMatches.length == 4) {
        actionDate = new Date(parseInt(dateMatches[1]), parseInt(dateMatches[2])-1,parseInt(dateMatches[3]),0, 0, 0, 0);
      } else if (dateMatches.length == 2) {
        actionDate = new Date(dateMatches[1]);
      } 
    }  
    const personMatches = description.match(this.props.personRegexp);
    const person = personMatches != null ? personMatches[1] : '';

    const projectMatches = description.match(this.props.projectRegexp);
    const project = projectMatches != null ? projectMatches[1] : '';

    const miscMatches = description.match(this.props.miscRegexp);
    const misc = miscMatches != null ? miscMatches.length == 2 ? miscMatches[1] : "" : "";

    return new TodoItem(
      status,
      description,
      person.toLowerCase(),
      project.toLowerCase(),
      misc.toLowerCase(),
      description.match(this.props.somedayMaybeRegexp) != null,
      description.match(this.props.discussWithRegexp) != null,
      description.match(this.props.waitingForRegexp) != null,
      description.match(this.props.promisedToRegexp) != null,
      filePath,
      (entry.index ?? 0) + todoItemOffset,
      entry[0].length - todoItemOffset,
      actionDate,
    );
  }
}

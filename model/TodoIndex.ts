import { TAbstractFile, TFile, Vault } from 'obsidian';
import { TodoItem, TodoItemStatus } from '../model/TodoItem';
import { TodoParser } from '../model/TodoParser';

export interface TodoItemIndexProps {
  personRegexp:       RegExp;
  projectRegexp:      RegExp;
<<<<<<< HEAD:model/TodoIndex.ts
<<<<<<< HEAD:model/TodoIndex.ts
  miscRegexp:         RegExp;
=======
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup):src/model/TodoIndex.ts
=======
>>>>>>> parent of 55bb7fd (Merge pull request #21 from shabegom/typing-cleanup):src/model/TodoIndex.ts
  dateRegexp:         RegExp;
  discussWithRegexp:  RegExp;
  waitingForRegexp:   RegExp;
  promisedToRegexp:   RegExp;
  somedayMaybeRegexp: RegExp;
}

export class TodoIndex {
  private vault: Vault;
  private todos: Map<string, TodoItem[]>;
  private listeners: ((todos: TodoItem[]) => void)[];
  private props: TodoItemIndexProps;

  constructor(vault: Vault, listener: (todos: TodoItem[]) => void, props: TodoItemIndexProps) {
    this.props = props;
    this.vault = vault;
    this.todos = new Map<string, TodoItem[]>();
    this.listeners = [listener];
  }

  async reloadIndex(props: TodoItemIndexProps) {
    this.props = props;
    await this.initialize();
  }
  
  async initialize(): Promise<void> {
    // TODO: persist index & last sync timestamp; only parse files that changed since then.
    const todoMap = new Map<string, TodoItem[]>();
    let numberOfTodos = 0;
    const timeStart = new Date().getTime();

    const markdownFiles = this.vault.getMarkdownFiles();
    for (const file of markdownFiles) {
      const todos = await this.parseTodosInFile(file);
      numberOfTodos += todos.length;
      if (todos.length > 0) {
        todoMap.set(file.path, todos);
      }
    }

    const totalTimeMs = new Date().getTime() - timeStart;
    console.log(
      `[obsidian-stakeholder_action-plugin] Parsed ${numberOfTodos} TODOs from ${markdownFiles.length} markdown files in (${
        totalTimeMs / 1000.0
      }s)`,
    );
    this.todos = todoMap;
    this.registerEventHandlers();
    this.invokeListeners();
  }

  setStatus(todo: TodoItem, newStatus: TodoItemStatus): void {
    const file = this.vault.getAbstractFileByPath(todo.sourceFilePath) as TFile;
    const fileContents = this.vault.read(file);
    fileContents.then((c: string) => {
      const newTodo = `[${newStatus === TodoItemStatus.Done ? 'x' : ' '}] ${todo.description}`;
      const newContents = c.substring(0, todo.startIndex) + newTodo + c.substring(todo.startIndex + todo.length);
      this.vault.modify(file, newContents);
    });
  }

  private indexAbstractFile(file: TAbstractFile) {
    if (!(file instanceof TFile)) {
      return;
    }
    this.indexFile(file as TFile);
  }

  private indexFile(file: TFile) {
    this.parseTodosInFile(file).then((todos) => {
      this.todos.set(file.path, todos);
      this.invokeListeners();
    });
  }

  private clearIndex(path: string, silent = false) {
    this.todos.delete(path);
    if (!silent) {
      this.invokeListeners();
    }
  }

  public setProps(setter: (currentProps: TodoItemIndexProps) => TodoItemIndexProps): void {
    this.props = setter(this.props);
    //do I need to do anything else??
  }

  private async parseTodosInFile(file: TFile): Promise<TodoItem[]> {
    // TODO: Does it make sense to index completed TODOs at all?
    const todoParser = new TodoParser(this.props);
    const fileContents = await this.vault.cachedRead(file);
    return todoParser
      .parseTasks(file.path, fileContents)
      .then((todos) => todos.filter((todo) => todo.status === TodoItemStatus.Todo));
  }

  private registerEventHandlers() {
    this.vault.on('create', (file: TAbstractFile) => {
      this.indexAbstractFile(file);
    });
    this.vault.on('modify', (file: TAbstractFile) => {
      this.indexAbstractFile(file);
    });
    this.vault.on('delete', (file: TAbstractFile) => {
      this.clearIndex(file.path);
    });
    // We could simply change the references to the old path, but parsing again does the trick as well
    this.vault.on('rename', (file: TAbstractFile, oldPath: string) => {
      this.clearIndex(oldPath);
      this.indexAbstractFile(file);
    });
  }

  private invokeListeners() {
    const todos = ([] as TodoItem[]).concat(...Array.from(this.todos.values()));
    this.listeners.forEach((listener) => listener(todos));
  }
}

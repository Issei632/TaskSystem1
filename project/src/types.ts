export interface Task {
  private _id(_id: any): unknown;
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

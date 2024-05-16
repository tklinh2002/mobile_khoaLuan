type CreateJobTaskRequest = {
  id?: string;
  name?: string;
  desc?: string;
  deadline?: string;
  priority?: string;
};
type freelancerUpdateStatusTask = {
  id?: string;
  status?: string;
};
type ClientConfirmUpdateStatusRequest = {
  id?: string;
  confirm_status?: string;
};
type AddCommentRequest = {
  task_id?: string | number;
  type?: "text" | "file";
  content?: any;
};
type INotiParams = {
  title: string;
  message: string;
  linkable: string;
  smail: number;
  imagefile: File | null;
  user_type?: string;
  user_id?: number;
};
export {
  CreateJobTaskRequest,
  freelancerUpdateStatusTask,
  ClientConfirmUpdateStatusRequest,
  AddCommentRequest,
  INotiParams
};

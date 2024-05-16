import { Skill } from "./skill";

export interface Job {
  id: string;
  client_id: string;
  title: string;
  thumbnail: any;
  desc: string;
  content: string;
  bids: number;
  deadline: Date;
  skill: Array<Skill>;
  content_file: any;
  status: number;
}
 
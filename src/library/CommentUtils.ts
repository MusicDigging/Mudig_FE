import { IComment, IReply } from '../types/playlist';

export const filterComments = (comments: IComment[], replies: IReply) =>
  comments
    .filter(
      ({ parent, is_active, id }) =>
        (is_active && !parent) || (!is_active && replies[id]),
    )
    .sort(
      ({ created_at: a }, { created_at: b }) =>
        new Date(b).getTime() - new Date(a).getTime(),
    );

export const filterReplies = (comments: IComment[]) =>
  comments
    .filter(({ parent, is_active }) => parent !== null && is_active)
    .reduce((repliesGroup: IReply, data) => {
      const { parent } = data;
      if (parent !== null) {
        repliesGroup[parent] = [...(repliesGroup[parent] || []), data];
      }
      return repliesGroup;
    }, {});

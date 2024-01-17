export const filterComments = (comments, replies) =>
  comments
    .filter(
      ({ parent, is_active, id }) =>
        (is_active && !parent) || (!is_active && replies[id]),
    )
    .sort(({ created_at: a }, { created_at: b }) => new Date(b) - new Date(a));

export const filterReplies = (comments) =>
  comments
    .filter(({ parent, is_active }) => parent !== null && is_active)
    .reduce((repliesGroup, data) => {
      const { parent } = data;
      repliesGroup[parent] = [...(repliesGroup[parent] || []), data];
      return repliesGroup;
    }, {});

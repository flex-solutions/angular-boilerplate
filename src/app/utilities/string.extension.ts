export class StringExtension {
  // string.Format('Hello {{0}}', 'world') simple look like the C#. Not using { } because it cause complie in template.
  // Template muse be use {{ }} for unescaped
  static format(str: string, params): string {
    const regex = new RegExp('{{-?[0-9]+}}', 'g');
    return str.replace(regex, function(item) {
      const temp = item.substring(2, item.length - 2);
      const intVal = parseInt(temp, 2);
      let replace = '';
      if (intVal >= 0) {
        replace = params[intVal];
      } else if (intVal === -1) {
        replace = '{';
      } else if (intVal === -2) {
        replace = '}';
      } else {
        replace = '';
      }
      return replace;
    });
  }
}

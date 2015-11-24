function Trim(input, characters) {

  if (!characters) {
    if (String.prototype.trim) {
      return String.prototype.trim.call(input);
    }
    characters = '\\s';
  }

  return String(input).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
}
function dasherize(input) {
  input = input.trim();

  input = input
    .replace(/([A-Z])/g, '-$1')     // Replace capitals with dash and lowercase
    .replace(/[-_\s]+/g, '-')       // Replace whitespace, underscores with dashes
    .toLowerCase();

  return Trim(input, '-');   // Trim leading and ending dashes
}

module.exports = {
  Trim: Trim,
  dasherize: dasherize
};

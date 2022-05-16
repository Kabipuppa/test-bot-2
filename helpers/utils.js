function state(a, b, c, d, completed, num, ctx, step, num_kid) {
  value = a - b - c - d;
  sum = b + c + d;
  if (value === 0) {
    ctx.reply(completed, num_kid);
  } else if (step === 4 && a != sum) {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
  } else if (value > 0) {
    ctx.reply(completed, num);
  } else {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
  }
}
module.exports = { state };

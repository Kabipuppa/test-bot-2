function state(a, b, c, d, ctx, step, select_salary, select, x, y) {
  value = a - b - c - d;
  sum = b + c + d;
  if (value === 0) {
    ctx.reply(select_salary);
    return (step = 5);
  } else if (step === 4 && a != sum) {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
    return (step = y);
  } else if (value > 0) {
    ctx.reply(select);
    return (step = x);
  } else {
    ctx.reply(
      "Введенное число не соответствет количеству человек в вашей семье."
    );
    return (step = y);
  }
}

async function subsidy(a, result, info, ctx) {
  if (a == true) {
    await ctx.reply("<b>Субсидия положена! 🟢</b>", { parse_mode: "html" });
    await ctx.reply(`<b>Субсидия равна: ${sum_subsidy.toFixed(2)} рублей</b>`, {
      parse_mode: "html",
    });
    await ctx.reply(info);
  } else {
    if (result == true) {
      await ctx.reply("<b>Субсидия положена! 🟢</b>", {
        parse_mode: "html",
      });
      await ctx.reply(
        `<b>Субсидия равна: ${sum_subsidy.toFixed(2)} рублей</b>`,
        {
          parse_mode: "html",
        }
      );
      await ctx.reply(info);
    } else {
      await ctx.reply("<b>Субсидия не положена! 🟠</b>", {
        parse_mode: "html",
      });
      await ctx.reply(info);
    }
  }
}
module.exports = { state, subsidy };

function state(a, b, c, d, ctx, step, select_salary, select, x, y) {
  value = a - b - c - d;
  sum = b + c + d;
  if (value === 0) {
    ctx.reply(select_salary, { parse_mode: "html" });
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

async function subsidy(S, rs, Dmax, jkh, ctx, info) {
  if (rs - Dmax > 0) {
    S = rs - Dmax; // субсидия
    if (S < jkh) {
      await ctx.reply("<b>Субсидия положена! 🟢</b>", {
        parse_mode: "html",
      });
      await ctx.reply(`<b>Субсидия равна: ${S.toFixed(2)} рублей</b>`, {
        parse_mode: "html",
      });
      await ctx.reply(info);
      // console.log(S);
    } else {
      S = jkh;
      await ctx.reply("<b>Субсидия положена! 🟢</b>", {
        parse_mode: "html",
      });
      await ctx.reply(`<b>Субсидия равна: ${S.toFixed(2)} рублей</b>`, {
        parse_mode: "html",
      });
      await ctx.reply(info);
      // console.log(S);
    }
  } else {
    await ctx.reply("<b>Субсидия не положена! 🟠</b>", {
      parse_mode: "html",
    });
    await ctx.reply(info);
    // console.log(S);
  }
}

module.exports = { state, subsidy };

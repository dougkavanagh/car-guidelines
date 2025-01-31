(function () {
  try {
    const data = ScriptUtil.getDataIntegration("CAR");
    const options = data ? data.options || [] : [];
    const selectedR = carRecommendation.r;
    const selectedOption = options.find((o) => o.n === selectedR);
    if (!selectedOption) {
      return "";
    }
    const category = selectedOption.c || selectedOption.n;
    const recoms = [];
    options.forEach((o) => {
      if (
        !o.a &&
        (o.n == selectedOption.n || o.n == category || o.c == selectedOption.n)
      ) {
        recoms.push(o);
      }
    });
    var recomSummary =
      recoms
        .map(function (r) {
          var t = r.t || r.v;
          if (r.n === selectedOption.n) {
            t = "<u>" + t + "</u>";
          }
          return !r.c ? "<b>" + t + "</b>" : t;
        })
        .join("\n")
        .trim() || "";
    var context = "\n\n<i>- " + category + "</i>";
    if (recomSummary.includes("↑") || recomSummary.includes("↓")) {
      context += " → <i>Strength of Recommendation:</i>";
      if (recomSummary.includes("(↑↑)")) {
        context += " ↑↑: strong for";
      }
      if (recomSummary.includes("(↑)")) {
        context += " ↑: conditional for";
      }
      if (recomSummary.includes("(↓)")) {
        context += " ↓: conditional against";
      }
      if (recomSummary.includes("(↓↓)")) {
        context += " ↓↓: strong against";
      }
    }
    if (recomSummary.includes("EPc")) {
      context += "\nEpc: Expert Panel consensus";
    }
    if (recomSummary.includes("DBT")) {
      context += "\nDBT: digital breast tomosynthesis";
    }
    return recomSummary + context;
  } catch (recommendationSummary) {
    return "(error)";
  }
})();

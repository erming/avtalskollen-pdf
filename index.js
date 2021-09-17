const pdf = require("./services/pdf");
const fs = require("fs-extra");

(async () => {
  await pdf.init();
  await Promise.all([
    pdf.generate("a.pdf"),
    pdf.generate("b.pdf"),
  ]);
  await pdf.merge("a.pdf", "b.pdf", "result.pdf");
  await Promise.all([
    fs.remove("a.pdf"),
    fs.remove("b.pdf"),
  ]);
  await pdf.close();
})();


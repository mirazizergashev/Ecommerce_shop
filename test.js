let options = {

    ism: a.ism,
    fam: a.fam,
    filial: a.filial,
    tolov_id: a.tolov_id,
    guruh: a.guruh,
    kurs: a.kurs,
    yunalish: a.yunalish,
    qr: url,
    asl_narx: a.asl_narx,
    pay: a.pay,
    farq: a.farq,
    ozgar: ozgar,
    usul: a.usul,
    summa: a.summa.split(' ').join('') || 0,
    izoh: a.izoh,
    vaqt: new Date().toLocaleString(),
    sana: date,
    format: "Letter",
    orientation: "landscape",
    border: {
      top: '0in', // default is 0, units: mm, cm, in, px
      right: '0.1cm',
      bottom: '0in',
      left: '0in'
    },
  }

console.log((k.map(w=>w.son)).reduce((a,b)=> a+b))
console.log(k.find(e=>e.id=3))

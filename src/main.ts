import './style.css'
import 'bootstrap/dist/css/bootstrap.css'

interface HozzaferesiAdat{
  id: number;
  nev: string;
  erdeklodes: string;
  kor: number;
}

async function adatLetoltes(){
  try{
    const response = await fetch('https://retoolapi.dev/XutzRp/data');
    const adatok = await response.json() as HozzaferesiAdat[];
    var temp = "";

    adatok.forEach(data => {
      temp += "<tr>";
            temp += "<td>"+ data.id +"</td>";
            temp += "<td>"+ data.nev +"</td>";
            temp += "<td>"+ data.erdeklodes +"</td>";
            temp += "<td>"+ data.kor +"</td>";
            temp += "<td>"+ "<button class=\"btn btn-outline-danger\">Törlés</button>" + "</td>"; // nincs kész
            temp += "</tr>"
    })
    document.getElementById("adatok")!.innerHTML = temp;
  }
  catch(e:any){
    document.getElementById("errorMessage")!.textContent = 
    "hiba " + e.message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const nevInput = document.getElementById("nevInput") as HTMLInputElement;
  const erdeklodesInput = document.getElementById("erdeklodesInput") as HTMLInputElement;
  const korInput = document.getElementById("korInput") as HTMLInputElement;
  document.getElementById("ujadat")?.addEventListener('click', async() => {
    const ujAdat = {
        nev: nevInput.value,
        erdeklodes: erdeklodesInput.value,
        kor: korInput.value,
    }
    
    const res = await fetch('https://retoolapi.dev/XutzRp/data', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(ujAdat),
    })

    if(res.ok){
        location.reload();
    } else{
        document.getElementById("errorMessage")!.textContent = 
        'Hiba a feltöltés közben';
    }
  })

  adatLetoltes();
})
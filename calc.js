
        // --- Konfigurace apartmánů na jednom místě ---
        const APARTMENTS = {
            A: {
                capacity: 11,   // počet pevně daných lůžek
                extra: 5,    // počet přistýlek
                silvesterRate: 7000, // základní sazba/noc
                silvesterMin: 4,    // min. nocí
                silvesterPeople: 10    // max. osob bez příplatku
            },
            B: {
                capacity: 6,
                extra: 2,
                silvesterRate: 4200,
                silvesterMin: 4,
                silvesterPeople: 6
            },
            AB: {
                capacity: 17,   // A+B pohromadě
                extra: 7,
                silvesterRate: 7000 + 4200,
                silvesterMin: 4,
                silvesterPeople: 10 + 6
            }
        };

        function createBedSVG(state, title) {
            const ns = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(ns, "svg");

            // použijeme stejný viewBox jako v tvém SVG
            svg.setAttribute("viewBox", "0 0 297 210");
            svg.setAttribute("width", "297");
            svg.setAttribute("height", "210");
            svg.classList.add("bed-svg", state);
            svg.setAttribute("title", title);

            if (state === "emptyextra") {
                // přistýlka – jen ten „rect3“ path
                const extra = document.createElementNS(ns, "path");
                extra.setAttribute("class", "bedExtra");
                extra.setAttribute("d", "M 11.123606,132.21312 H 285.87636 c 6.16248,0 11.12361,4.46 11.12361,10 v 57.78698 c 0,5.54 -4.96113,10 -11.12361,10 H 11.123606 C 4.9611282,210.0001 0,205.5401 0,200.0001 v -57.78698 c 0,-5.54 4.9611282,-10 11.123606,-10 z");
                svg.appendChild(extra);


            }
            if (state === "extraoccupied") {
                // přistýlka – jen ten „rect3“ path
                const extra = document.createElementNS(ns, "path");
                extra.setAttribute("class", "bedExtra");
                extra.setAttribute("d", "M 11.123606,132.21312 H 285.87636 c 6.16248,0 11.12361,4.46 11.12361,10 v 57.78698 c 0,5.54 -4.96113,10 -11.12361,10 H 11.123606 C 4.9611282,210.0001 0,205.5401 0,200.0001 v -57.78698 c 0,-5.54 4.9611282,-10 11.123606,-10 z");
                svg.appendChild(extra);
                // 2) matrace – path „rect2“
                const mattress = document.createElementNS(ns, "path");
                mattress.setAttribute("class", "mattress");
                mattress.setAttribute("d", "m 106.87344,68.524986 h 150.8779 V 123.6493 h -150.8779 z");
                svg.appendChild(mattress);

                // 3) polštář – path „path2“
                const pillow = document.createElementNS(ns, "path");
                pillow.setAttribute("class", "pillow");
                pillow.setAttribute("d", "M 57.524654 58.717863 A 22.394299 21.48299 0 0 0 35.130155 80.200789 A 22.394299 21.48299 0 0 0 57.524654 101.68423 A 22.394299 21.48299 0 0 0 79.918636 80.200789 A 22.394299 21.48299 0 0 0 57.524654 58.717863 z");
                svg.appendChild(pillow);
                // 3) ruky – path „path2“
                const ruky = document.createElementNS(ns, "path");
                ruky.setAttribute("class", "ruky");
                ruky.setAttribute("d", "M 92.256901 68.525016 C 87.091045 68.525016 82.932406 72.118196 82.932406 76.581372 L 82.932406 104.99979 L 47.67616 104.99979 C 42.564603 104.99979 38.449333 109.15894 38.449333 114.3248 C 38.449333 119.49066 42.564603 123.6493 47.67616 123.6493 L 92.256901 123.6493 L 92.355086 123.6493 C 92.544918 123.6493 92.730403 123.63219 92.917326 123.62088 C 93.024891 123.61441 93.134313 123.61391 93.24082 123.60434 C 93.337037 123.59516 93.430758 123.57874 93.526074 123.56662 C 98.085646 123.03357 101.58191 119.68304 101.58191 115.59294 L 101.58191 114.3248 L 101.58191 76.581372 C 101.58191 72.118196 97.422757 68.525016 92.256901 68.525016 z");
                svg.appendChild(ruky);


            }
            if (state === "empty") {
                // 1) rám – path „rect1“
                const frame = document.createElementNS(ns, "path");
                frame.setAttribute("class", "frame");

                frame.setAttribute("d", "M 15.000118 22.298381 A 15 15 0 0 0 0 37.298499 L 0 210.0001 L 30.000236 210.0001 L 30.000236 162.21284 L 267.00024 162.21284 L 267.00024 210.0001 L 296.99996 210.0001 L 296.99996 68.525016 A 15 15 0 0 0 282.00036 53.524898 A 15 15 0 0 0 267.00024 68.525016 L 267.00024 132.21312 L 30.000236 132.21312 L 30.000236 37.298499 A 15 15 0 0 0 15.000118 22.298381 z");
                svg.appendChild(frame);


            }
            if (state === "occupied") {
                // 1) rám – path „rect1“
                const frame = document.createElementNS(ns, "path");
                frame.setAttribute("class", "frame");

                frame.setAttribute("d", "M 15.000118 22.298381 A 15 15 0 0 0 0 37.298499 L 0 210.0001 L 30.000236 210.0001 L 30.000236 162.21284 L 267.00024 162.21284 L 267.00024 210.0001 L 296.99996 210.0001 L 296.99996 68.525016 A 15 15 0 0 0 282.00036 53.524898 A 15 15 0 0 0 267.00024 68.525016 L 267.00024 132.21312 L 30.000236 132.21312 L 30.000236 37.298499 A 15 15 0 0 0 15.000118 22.298381 z");
                svg.appendChild(frame);

                // 2) matrace – path „rect2“
                const mattress = document.createElementNS(ns, "path");
                mattress.setAttribute("class", "mattress");
                mattress.setAttribute("d", "m 106.87344,68.524986 h 150.8779 V 123.6493 h -150.8779 z");
                svg.appendChild(mattress);

                // 3) polštář – path „path2“
                const pillow = document.createElementNS(ns, "path");
                pillow.setAttribute("class", "pillow");
                pillow.setAttribute("d", "M 57.524654 58.717863 A 22.394299 21.48299 0 0 0 35.130155 80.200789 A 22.394299 21.48299 0 0 0 57.524654 101.68423 A 22.394299 21.48299 0 0 0 79.918636 80.200789 A 22.394299 21.48299 0 0 0 57.524654 58.717863 z");
                svg.appendChild(pillow);
                // 3) ruky – path „path2“
                const ruky = document.createElementNS(ns, "path");
                ruky.setAttribute("class", "ruky");
                ruky.setAttribute("d", "M 92.256901 68.525016 C 87.091045 68.525016 82.932406 72.118196 82.932406 76.581372 L 82.932406 104.99979 L 47.67616 104.99979 C 42.564603 104.99979 38.449333 109.15894 38.449333 114.3248 C 38.449333 119.49066 42.564603 123.6493 47.67616 123.6493 L 92.256901 123.6493 L 92.355086 123.6493 C 92.544918 123.6493 92.730403 123.63219 92.917326 123.62088 C 93.024891 123.61441 93.134313 123.61391 93.24082 123.60434 C 93.337037 123.59516 93.430758 123.57874 93.526074 123.56662 C 98.085646 123.03357 101.58191 119.68304 101.58191 115.59294 L 101.58191 114.3248 L 101.58191 76.581372 C 101.58191 72.118196 97.422757 68.525016 92.256901 68.525016 z");
                svg.appendChild(ruky);

            }

            return svg;
        }


        // ----- Data -----
        const holidays = [
            { date: "01-01", title: "Den obnovy samostatného českého státu" },
            { date: "05-08", title: "Den vítězství" },
            { date: "07-05", title: "Den slovanských věrozvěstů Cyrila a Metoděje" },
            { date: "07-06", title: "Den upálení mistra Jana Husa" },
            { date: "09-28", title: "Den české státnosti" },
            { date: "10-28", title: "Den vzniku samostatného československého státu" },
            { date: "11-17", title: "Den boje za svobodu a demokracii" },
            { date: "04-04", title: "Velký pátek" },
            { date: "04-05", title: "Velikonoční pondělí" },
            { date: "05-01", title: "Svátek práce" }
        ];
        // 1) recalc() – překreslí postele, aktivuje tooltipy, přepočte cenu, apod.
        function recalc() {
            renderBeds();      // ← dispose + rebind
            calculatePrice();
            fillReservationFormData();
        }


        function initInteractiveBeds() {
            document
                .querySelectorAll('#apartmentSelect, #peopleA')
                .forEach(el => el.addEventListener('change', renderBeds));

            // A také při načtení stránky:
            renderBeds();
        }
        function renderBeds() {
            const apt = document.getElementById('apartmentSelect').value;
            const cap = apt === 'A' ? 11 : 6;
            const maxExtras = (apt === 'A' ? 16 : 8) - cap;
            const people = +document.getElementById('peopleA').value;

            const usedBeds = Math.min(people, cap);
            const usedExtra = Math.max(people - cap, 0);
            const freeBedsOnly = cap - usedBeds;
            const freeExtrasOnly = maxExtras - usedExtra;
            const totalUsed = usedBeds + usedExtra;
            const totalMax = cap + maxExtras;
            const utilization = Math.round((totalUsed / totalMax) * 100);

            const grid = document.getElementById('bedsGridContainer');
            grid.innerHTML = '';

            // 1) Standardní lůžka
            for (let i = 0; i < cap; i++) {
                const state = i < usedBeds ? 'occupied' : 'empty';
                const svg = createBedSVG(state, `Postel ${i + 1}`);
                svg.setAttribute("data-bs-toggle", "tooltip");
                svg.setAttribute("data-bs-custom-class", "white-tooltip");


                svg.addEventListener('click', onBedClick);
                grid.appendChild(svg);
            }
 
             // 2) Přistýlky
            for (let j = 0; j < maxExtras; j++) {
                const idx = cap + j + 1;
                // pokud j < usedExtra ⇒ skutečná (obsazená) extra
                // jinak ⇒ prázdná extra
                const state = j < usedExtra ? 'extraoccupied' : 'emptyextra';
                const svg = createBedSVG(state, `Přistýlka ${idx}`);
                svg.setAttribute("data-bs-toggle", "tooltip");
                svg.setAttribute("data-bs-custom-class", "white-tooltip");
                svg.addEventListener('click', onBedClick);
                grid.appendChild(svg);
            }


            initTooltips();  // pokud tooltipy používáš

            // 3) Shrnutí
            const parts = []; 
            // Obsazená lůžka
            parts.push(
                `<span class="badge bg-primary">Obsazeno: ${totalUsed} / ${totalMax}</span>`
            );

            // Volná lůžka
            parts.push(
                `<span class="badge bg-secondary">Neobsazeno: ${freeBedsOnly}</span>`
            );

            // Přistýlky
            parts.push(
                `<span class="badge  bg-secondary  ">Přistýlek: ${usedExtra}/${maxExtras}</span>`
            );

            // Vložíme HTML
            document.getElementById('bedsSummary').innerHTML = parts.join('');
        }
        function onBedClick(e) {
            // 1) Zavřeme tooltipy (pokud je používáš)
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                const ti = bootstrap.Tooltip.getInstance(el);
                if (ti) ti.hide();
            });

            // 2) Najdeme _všechny_ beds (teď SVG s třídou bed-svg)
            const beds = Array.from(
                document.querySelectorAll('#bedsGridContainer .bed-svg')
            );

            // 3) Určíme index toho, na co kliknul(e)
            const idx = beds.indexOf(e.currentTarget);

            // 4) Nastavíme select na počet osob = index+1
            if (idx !== -1) {
                document.getElementById('peopleA').value = idx + 1;
                recalc();
            }
        }


        function updateBedsSummary(beds, cap, extras, maxExtras) {
            document.getElementById('bedsSummary').textContent =
                `Postelí: ${beds}/${cap}, přistýlek: ${extras}/${maxExtras}`;
        }
        // ----- Init -----
        document.addEventListener('DOMContentLoaded', init);
        function init() {
            renderPriceTable();
            initDateRangePicker();
            initApartmentPeople();
            ['change', 'input'].forEach(ev =>
                document
                    .querySelectorAll('#priceCalculatorA select, #priceCalculatorA input')
                    .forEach(el => el.addEventListener(ev, recalc))
            );

            // po tom, co voláš daterangepicker(...)
            $('#daterange').on('apply.daterangepicker', function (ev, picker) {
                recalc();
            });

            recalc();
        }
        // po init()


        // místo původní funkce
        function getSilvesterDates() {
            const year = new Date().getFullYear();
            const start = new Date(year, 11, 30);    // 30. 12.
            const end = new Date(year + 1, 0, 2); // 02. 01. následujícího roku
            const dates = [];
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const full = `${day}.${month}.${d.getFullYear()}`;
                dates.push(full);
            }
            return dates.join('\n');
        }

        function renderPriceTable() {
            const container = document.getElementById('priceTableContainer');
            container.innerHTML = '';


            const colA = createTable(
                ["Období", "Cena", "Minimální počet nocí"],
                [
                    [`<span class="holiday-info" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" title="Noc neděle až čtvrtek">i</span> Všední den`, "550 CZK", "2"],
                    [`<span class="holiday-info" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" title="páteční a sobotní noc">i</span> Víkendová noc`, "650 CZK", "2"],
                    [`<span class="holiday-info" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" title="${getHolidayDates().replace(/"/g, '&quot;')}">i</span> Sváteční noc`, "650 CZK", "2"],
                    [`<span class="holiday-info" data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" title="${getSilvesterDates()}">i</span> Silvestr`, "650 CZK", "4"]
                ]
            );
            container.appendChild(colA);

            const colB = createTable(
                ["Příplatek", "Cena"],
                [
                    ["Pouze 1 noc", "+30%"],
                    ["Neobsazená postel", "300 CZK"],
                    ["Pes (za den)", "300 CZK"]
                ]
            );
            container.appendChild(colB);

            // znovu inicializovat tooltipy
            initTooltips();
        }

        function createTable(headers, rows) {
            const table = document.createElement('table');
            table.className = 'table';
            const thead = document.createElement('thead');
            thead.className = '';
            thead.innerHTML = `<tr>${headers.map(h => `<th class="">${h}</th>`).join('')}</tr>`;
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            rows.forEach(r => {
                const tr = document.createElement('tr');
                r.forEach(c => {
                    const td = document.createElement('td');
                    td.innerHTML = c;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            return table;
        }

        function getHolidayDates() {
            return holidays.map(h => {
                const [m, d] = h.date.split('-');
                return `${d}.${m}. – ${h.title}`;
            }).join('\n');
        }

        function initTooltips() {
            document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
                // pokud už tooltip existuje, zničíme ho
                const inst = bootstrap.Tooltip.getInstance(el);
                if (inst) inst.dispose();
                // a vytvoříme nový
                new bootstrap.Tooltip(el);
            });
        }


        // ----- DateRangePicker -----
        function initDateRangePicker() {
            const $dr = $('#daterange');
            const today = new Date();
            const start = new Date(today); start.setDate(start.getDate() + 1);
            const end = new Date(start); end.setDate(end.getDate() + 3);
            const fmt = d => `${String(d.getDate()).padStart(2, '0')}.` +
                `${String(d.getMonth() + 1).padStart(2, '0')}.` +
                `${d.getFullYear()}`;
            $dr.daterangepicker({
                autoApply: false,
                locale: {
                    format: 'DD.MM.YYYY', separator: ' - ', "showDropdowns": true, "showWeekNumbers": true,
                    "showISOWeekNumbers": true,

                    applyLabel: 'Aplikovat', cancelLabel: 'Zrušit',
                    daysOfWeek: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
                    monthNames: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
                    firstDay: 1
                },
                startDate: fmt(start),
                endDate: fmt(end),
                drops: 'down'
            }, (s, e) => $('#nights').val(e.diff(s, 'days')));
            $('#nights').val((end - start) / (1000 * 60 * 60 * 24));
        }

        // ----- Kapacita a volná lůžka -----
        function initApartmentPeople() {
            const apt = document.getElementById('apartmentSelect');
            const ppl = document.getElementById('peopleA');
            apt.addEventListener('change', onApartmentChange);
            document
                .querySelectorAll('#apartmentSelect, #peopleA')
                .forEach(el => el.addEventListener('change', updateFreeBeds));

            onApartmentChange();
            updateFreeBeds();
        } function updateFreeBeds() {
            const aptVal = document.getElementById('apartmentSelect').value;
            const maxBeds = aptVal === 'A' ? 16 : 8;
            const cap = aptVal === 'A' ? 11 : 6;
            const used = +document.getElementById('peopleA').value;
            const filledBeds = Math.min(used, cap);
            const freeBeds = cap - filledBeds;
            const extrasTotal = maxBeds - cap;
            const extrasUsed = Math.max(used - cap, 0);
            const extrasFree = extrasTotal - extrasUsed;
            initInteractiveBeds();

        }



        function onApartmentChange() {
            const aptVal = document.getElementById('apartmentSelect').value;
            const max = aptVal === 'A' ? 16 : 8;
            const cap = aptVal === 'A' ? 11 : 6;
            // v onApartmentChange() místo textContent pro capacityDisplay:
            const capDisp = document.getElementById('capacityDisplay');

            const pplSelect = document.getElementById('peopleA');
            pplSelect.innerHTML = '';
            for (let i = 1; i <= max; i++) {
                const opt = document.createElement('option');
                opt.value = i; opt.textContent = i;
                pplSelect.appendChild(opt);
            }
            updateFreeBeds();

        }






        function calculate() {
            calculatePrice();
            fillReservationFormData();
        }

        function calculatePrice() {
            // --- načtení vstupních hodnot ---
            const dateRange = $('#daterange').val().split(' - ');
            const dateFrom = new Date(dateRange[0].split('.').reverse().join('-'));
            const dateTo = new Date(dateRange[1].split('.').reverse().join('-'));
            let people = parseInt($('#peopleA').val(), 10);
            const pets = parseInt($('#petsA').val(), 10);
            const diffTime = dateTo - dateFrom;
            const diffNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffTime <= 0) { alert('Datum odjezdu nesprávné'); return; }
            if (diffNights < 1) { alert('Min. počet nocí je 1.'); return; }

            // --- cenové konstanty ---
            const apt = $('#apartmentSelect').val();
            const capacity = apt === 'A' ? 11 : 6;
            const showFreeBedsColumn = people < capacity;

            const showPetColumn = pets > 0;
            const standardPrice = 550;
            const weekendPrice = 650;
            const unusedBedPrice = 300;
            const holidayPrice = 650;
            const silvestrPrice = 650;
            const petPrice = 300;

            // --- Silvestr detekce ---
            const isSilvestr = dateFrom <= new Date(dateFrom.getFullYear(), 11, 31)
                && dateTo >= new Date(dateFrom.getFullYear(), 11, 31);
            let silvestrNights = 0;

            // --- ikony pro typ ceny ---
            const iconMap = {
                'Všední noc': 'bed',
                'Víkendová noc': 'weekend',
                'Svátek': 'event',
                'Silvestrovská noc': 'celebration'
            };

            let totalPrice = 0;
            // po tomto řádku:
            $('#totalPrice2').html(`${totalPrice.toLocaleString()} CZK`);
            // přidej:
            $('#totalNights').html(`${diffNights}`);
            $('#totalPeople').html(`${people}`);

            // …po aktualizaci #totalApartment přidáš:

            // 1) Začátek pobytu
            $('#totalStart').text(`${dateFrom.toLocaleDateString('cs-CZ', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            })}`);

            // 2) Mazlíčci
            if (pets > 0) {
                $('#totalPets').text(`${pets}`);
            } else {
                $('#totalPets').text(` ne`);
            }

            // načteme vybraný apartmán
            const apartment = $('#apartmentSelect').val();
            // a zapíšeme do elementu
            $('#totalApartment').text(` ${apartment}`);
            // --- hlavička tabulky ---
            let breakdown = `
        <table class="table">
        <thead>
            <tr>
            <th>Ubytovací noc</th> 
            <th>Obsazené postele</th>
          ${showFreeBedsColumn ? '<th>Neobsazené postele</th>' : ''}
            ${showPetColumn ? '<th>Mazlíčci</th>' : ''}
            ${diffNights === 1 ? '<th>Příplatek 30 %</th>' : ''}
            <th>Celkem za noc</th>
            </tr>
        </thead>
        <tbody>
    `;

            for (let d = new Date(dateFrom); d < dateTo; d.setDate(d.getDate() + 1)) {
                const day = new Date(d);
                const dateStr = `${String(day.getDate()).padStart(2, '0')}.` +
                    `${String(day.getMonth() + 1).padStart(2, '0')}.${day.getFullYear()}`;
                const weekday = day.toLocaleDateString('cs-CZ', { weekday: 'long' });
                const isHolidayDay = holidays.find(h =>
                    h.date === `${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`
                );
                const isWeekendDay = [5, 6].includes(day.getDay());

                // 1) typ ceny a cena obsazených lůžek
                let priceType, occupiedBedsPrice;
                if (isSilvestr && silvestrNights < 4) {
                    priceType = 'Silvestrovská noc';
                    occupiedBedsPrice = silvestrPrice * people;
                    silvestrNights++;
                } else if (isHolidayDay) {
                    priceType = `Sváteční noc:: ${isHolidayDay.title}`;
                    occupiedBedsPrice = holidayPrice * people;
                } else if (isWeekendDay) {
                    priceType = 'Víkendová noc';
                    occupiedBedsPrice = weekendPrice * people;
                } else {
                    priceType = 'Všední noc';
                    occupiedBedsPrice = standardPrice * people;
                }

                // 2) neobsazená lůžka
                const unoccBeds = Math.max(capacity - people, 0);
                const unoccBedsPrice = unusedBedPrice * unoccBeds;

                // 3) poplatek za psa
                const petCharge = pets > 0 ? pets * petPrice : 0;

                // 4) případný příplatek za jednu noc
                let dayPrice = occupiedBedsPrice + unoccBedsPrice + petCharge;
                let surcharge = 0;
                if (diffNights === 1) {
                    surcharge = dayPrice * 0.3;
                    dayPrice += surcharge;
                }
                // buňka Typ ceny jako piktogram s tooltipem
                const ico = iconMap[priceType.split(':')[0]] || 'paid';


                // buňka Datum s tooltipem (den + svátek/Silvestr)
                const dateTooltip = isHolidayDay
                    ? `${weekday}, Svátek: ${isHolidayDay.title}`
                    : (priceType.startsWith('Silvestrovská noc') ? `${weekday}, Silvestr` : weekday);
                const dateCell = `
      <td>
        <span data-bs-toggle="tooltip" data-bs-custom-class="white-tooltip" class="material-symbols-outlined price-icon" title="${priceType.split(':')[0]} ">${ico} </span>
        <span data-bs-toggle="tooltip"
              data-bs-custom-class="white-tooltip"
              title="${dateTooltip}">
           
          ${dateStr}
        </span>
      </td>`;



                // buňka Obsazené postele: počet, tooltip=rozpis výpočtu
                const occupiedTooltip = `${people} × ${(occupiedBedsPrice / people).toLocaleString()} = ${occupiedBedsPrice.toLocaleString()} CZK`;
                const perBed = (occupiedBedsPrice / people).toLocaleString();
                const occupiedCell = `
  <td>
    <span data-bs-toggle="tooltip"
          data-bs-custom-class="white-tooltip"
          title="${people} × ${perBed} CZK = ${occupiedBedsPrice.toLocaleString()} CZK">
      ${people} × ${perBed}
    </span>
  </td>`;


                // buňka Neobsazené postele: počet, tooltip=rozpis výpočtu
                const unoccTooltip = `${unoccBeds} × ${unusedBedPrice} = ${unoccBedsPrice.toLocaleString()} CZK`;
                const unoccupiedCell = showFreeBedsColumn
                    ? `<td>
           <span data-bs-toggle="tooltip" title="${unoccBeds} × ${unusedBedPrice} = ${unoccBedsPrice} CZK">
             ${unoccBeds} × ${unusedBedPrice}
           </span>
         </td>`
                    : '';
                const petCell = showPetColumn ? `
      <td>
        <span data-bs-toggle="tooltip"
              data-bs-custom-class="white-tooltip"
              title="${pets} × ${petPrice} = ${petCharge.toLocaleString()} CZK">
          ${pets} x ${petPrice}
        </span>
      </td>` : '';

                // buňka Pes a případný příplatek 30%

                const surchargeCell = diffNights === 1 ? `<td>${surcharge.toLocaleString()} CZK</td>` : '';

                // buňka Za noc: číslo + tooltip detail
                let parts = [];
                parts.push(`Obsazené: ${occupiedTooltip}`);
                if (unoccBeds > 0) parts.push(`Neobsazené: ${unoccTooltip}`);
                if (petCharge) parts.push(`Pes: ${petCharge.toLocaleString()} CZK`);
                if (surcharge) parts.push(`Příplatek: ${surcharge.toLocaleString()} CZK`);
                const totalTooltip = parts.join('\n');
                const totalCell = `
      <td>
        <span data-bs-toggle="tooltip"
              data-bs-custom-class="white-tooltip"
              title="${totalTooltip}">
          ${dayPrice.toLocaleString()} CZK
        </span>
      </td>`;

                // sestavíme řádek
                breakdown += `
      <tr>
        
        ${dateCell}
        ${occupiedCell}
        ${unoccupiedCell}
        ${petCell}
        ${surchargeCell}
        ${totalCell}
      </tr>`;

                totalPrice += dayPrice;
            }

            // finální řádek – správně dopočítat colspan
            const staticCols = 2; // datum + obsazené
            const colspan = staticCols
                + (showFreeBedsColumn ? 1 : 0)
                + (showPetColumn ? 1 : 0)
                + (diffNights === 1 ? 1 : 0);
            breakdown += `
      <tr class="bg-secondary text-white">
        <td colspan="${colspan}">
          <strong>Cena pobytu</strong>
        </td>
        <td class="totalprice">${totalPrice.toLocaleString()} CZK</td>
      </tr>
    </tbody>
  </table>`;
            $('#result').html(breakdown).show();
            $('#totalPrice2').html(`${totalPrice.toLocaleString()} CZK`);
            $('#resultDetail').html(breakdown);
            initTooltips();
            fillReservationFormData();
        }

        function fillReservationFormData() {
            const form = document.getElementById('reservationForm');
            const dr = $('#daterange').val();
            const apt = $('#apartmentSelect').val();
            const ppl = +$('#peopleA').val();
            const pets = +$('#petsA').val();
            const orderNumber = $('#orderNumber').val();

            const priceText = $('#result .totalprice').first().text().trim();
            const price = priceText.replace('Celková cena: ', '');

            form.dataset.dateRange = dr;
            form.dataset.apartment = apt;
            form.dataset.totalPrice = price;
            form.dataset.orderNumber = orderNumber;

            form.termSummary.value = dr;
            form.men.value = Math.floor(ppl / 2);
            form.women.value = ppl - Math.floor(ppl / 2);
            form.dogs.value = pets;
            document.getElementById('apartmentInfo').value = 'Apartmán ' + apt;
            form.elements['priceSummary'].value = price;


        }

        async function onReservationSubmit(e, pageNo = 1) {
            e.preventDefault();

            // 1) Naplníme data
            fillReservationFormData();

            // 2) Název souboru
            const orderNum = document
                .getElementById('orderNumber')
                .value
                .trim() || 'objednavka';

            // 3) Hledáme element .inner uvnitř #page-X
            const pageEl = document.getElementById(`page-${pageNo}`);
            if (!pageEl) {
                alert(`Strana ${pageNo} neexistuje!`);
                return;
            }
            const innerEl = pageEl.querySelector('.inner');
            if (!innerEl) {
                alert(`Strana ${pageNo} nemá element .inner`);
                return;
            }

            // 4) Připravíme název souboru
            const filename = pageNo === 2
                ? `${orderNum}_strana2.pdf`
                : `${orderNum}.pdf`;

            // 5) Nastavíme relative kontejner pro footer
            innerEl.style.position = 'relative';

            // 6) Vložíme upravující <style> jen jednou, na .inner
            const styleTag = document.createElement('style');
            styleTag.textContent = `
    .form-control,
    .form-select,
    textarea {
      border: none !important;
      border-bottom: 1px solid #ced4da !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }
    .form-control[readonly],
    .form-control[disabled] {
      background-color: #fff !important;
    }
   .form-footer {
            margin-top: auto;
            position: absolute !important;
            bottom: 1rem;
            width: 90%;
        }

  `;
            innerEl.insertBefore(styleTag, innerEl.firstChild);

            // 7) Nastavení html2pdf
            const opt = {
                margin: [15, 15, 15, 15],
                filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
            };

            // 8) Generování PDF jen z .inner
            html2pdf()
                .set(opt)
                .from(innerEl)
                .save();
        }

        // --- Uložení formuláře do localStorage ---
        function saveFormToLocalStorage() {
            const form = document.getElementById('reservationForm');
            const data = {};
            Array.from(form.elements).forEach(el => {
                if (el.name) {
                    if (el.type === "checkbox" || el.type === "radio") {
                        data[el.name] = el.checked;
                    } else {
                        data[el.name] = el.value;
                    }
                }
            });
            localStorage.setItem('reservationFormData', JSON.stringify(data));
        }

        // --- Obnovení formuláře z localStorage ---
        function loadFormFromLocalStorage() {
            const form = document.getElementById('reservationForm');
            const data = JSON.parse(localStorage.getItem('reservationFormData') || '{}');
            Object.entries(data).forEach(([key, value]) => {
                const el = form.elements[key];
                if (el) {
                    if (el.type === "checkbox" || el.type === "radio") {
                        el.checked = value;
                    } else {
                        el.value = value;
                    }
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            loadFormFromLocalStorage();
            const form = document.getElementById('reservationForm');
            if (form) {
                form.addEventListener('input', saveFormToLocalStorage);

                // 1) zachytit SUBMIT formuláře (PDF 1)
                form.addEventListener('submit', e => onReservationSubmit(e, 1));
            }

            // 2) zachytit klik na "PDF 1" v kartě (id=openPdf1)
            const btnPdf1 = document.getElementById('openPdf1');
            if (btnPdf1) {
                btnPdf1.type = 'button';       // aby to nespouštělo defaultní submit
                btnPdf1.addEventListener('click', e => onReservationSubmit(e, 1));
            }

            // 3) zachytit klik na "PDF 2" (id=generatePage2)
            const btnPdf2 = document.getElementById('generatePage2');
            if (btnPdf2) {
                btnPdf2.type = 'button';
                btnPdf2.addEventListener('click', e => onReservationSubmit(e, 2));
            }
        });
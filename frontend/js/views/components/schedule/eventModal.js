
import { TEAM } from "../../../services/schedule/constants.js";

export function openEventModal(
  { start=null, end=null, allDay=false } = {},
  { onCreate }
) {

  const wrap = document.createElement("div");
  wrap.innerHTML = `
<div class="modal fade" tabindex="-1">
  <div class="modal-dialog">
    <form class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Novo evento</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>

      <div class="modal-body">
        <!-- 1) Dia e hora primeiro -->
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label">Início</label>
            <input type="datetime-local" class="form-control" name="start">
          </div>
          <div class="col-6">
            <label class="form-label">Fim</label>
            <input type="datetime-local" class="form-control" name="end">
          </div>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" name="allday" id="allday">
          <label class="form-check-label" for="allday">Dia inteiro</label>
        </div>

        <!-- 2) Por omissão: Medicação -->
        <div class="mb-3" data-med>
          <label class="form-label">Nome da medicação</label>
          <input class="form-control" name="title" placeholder="Ibuprofen 200mg">
        </div>

        <!-- 3) Opcional: Consulta com médico (menos evidente) -->
        <div class="form-check form-switch mb-2">
          <input class="form-check-input" type="checkbox" id="isConsultation">
          <label class="form-check-label" for="isConsultation">Marcar consulta com médico</label>
        </div>

        <div class="mb-1 d-none" data-consulta>
          <label class="form-label">Médico</label>
          <select class="form-select" name="doctor">
            ${TEAM.map(n => `<option value="${n}">${n}</option>`).join("")}
          </select>
          <div class="form-text">Cada médico pode ter no máximo 2 consultas por semana.</div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>
        <button class="btn btn-primary" type="submit">Criar</button>
      </div>
    </form>
  </div>
</div>`;

  const modalEl = wrap.firstElementChild;
  document.body.appendChild(modalEl);
  const Modal = window.bootstrap?.Modal;
  const modal = new Modal(modalEl);

 
  const startInp = modalEl.querySelector('input[name="start"]');
  const endInp   = modalEl.querySelector('input[name="end"]');
  const allDayInp= modalEl.querySelector('input[name="allday"]');
  const isCbx    = modalEl.querySelector('#isConsultation');
  const medBox   = modalEl.querySelector('[data-med]');
  const cnsBox   = modalEl.querySelector('[data-consulta]');

 
  const toLocalInput = (d) => new Date(+d - new Date().getTimezoneOffset()*60000)
    .toISOString().slice(0,16);
  const now = new Date();
  const defStart = start ?? new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+1, 0, 0, 0);
  const defEnd   = end   ?? new Date(defStart.getTime() + 30*60000);
  startInp.value = toLocalInput(defStart);
  endInp.value   = toLocalInput(defEnd);
  allDayInp.checked = !!allDay;

  isCbx.addEventListener("change", () => {
    const isConsulta = isCbx.checked;
    medBox.classList.toggle("d-none", isConsulta);
    cnsBox.classList.toggle("d-none", !isConsulta);
  });

  
  modalEl.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const start = new Date(startInp.value);
    const end   = new Date(endInp.value);
    const allday= allDayInp.checked;

    if (isCbx.checked) {
     
      const doctor = modalEl.querySelector('select[name="doctor"]').value;
      onCreate && onCreate({
        type: "consulta",
        doctor, start, end, allDay: allday
      });
    } else {
      
      const title = modalEl.querySelector('input[name="title"]').value?.trim();
      if (!title) return; 
      onCreate && onCreate({
        type: "med",
        title, start, end, allDay: allday
      });
    }

    modal.hide();
    modalEl.addEventListener("hidden.bs.modal", () => modalEl.remove(), { once: true });
  });

  modal.show();
}

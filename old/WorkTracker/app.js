"use strict";

// Work Tracker

//############################################################################

const dateOfActivity = document.getElementById("date-of-activity"); // Datum der Tätigkeit
const closeDialogWarningButton = document.getElementById("close_dialog_warning"); // Schließt den Warnhinweisdialog und kehrt zur Eingabe zurück
const closeDialogWarningEndButton = document.getElementById("close_dialog_warning_end"); // Schließt den Warnhinweisdialog und beendet die Eingabe komlett
const listAreaOfActivity = document.getElementById("area-of-activity"); // hier werden die einzelnen Optionen eingefügt
const addAreaOfActivityDialog = document.getElementById("dialog-add-list-item");
const openDialogAddNewActivityAreaButton = document.getElementById("open_dialog_add_new_list");
const closeDialogAddNewActivityAreaButton = document.getElementById("close_dialog_add_new_list");
const closeDialogAddNewActivityAreaWithoutButton = document.getElementById(
  "close_dialog_add_list_item",
);
const closeDialogDeleteListButton = document.getElementById("close_dialog_delete_list");
const mainArea = document.getElementById("main");
const saveActivityButton = document.getElementById("save-activity");

// Inputfeld für den Name der neuen Liste
const nameNewActivityListItem = document.getElementById("name_new_activity-area");

function setCurrentDate() {
  const heute = new Date().toISOString().split("T")[0];
  dateOfActivity.value = heute;
}
setCurrentDate();

//*************************************************
//Bestehende Einträge laden und anzeigen

// Liste der verschiedenen Arbeitslisten

//Laden und speichern und Ausgeben der Listen

let allListItems = getLists();
updateListItems();

// Alle Arbeitslisten aus dem Speicher holen und in Variable speichern

function getLists() {
  try {
    return JSON.parse(localStorage.getItem("listItems")) || [];
  } catch {
    return [];
  }
}

// Die Namen der Listen zur Auswahl einfügen
function updateListItems() {
  listAreaOfActivity.innerHTML = ""; //erstmal alles leer machen, damit keine Einträge doppelt vorkommen

  if (allListItems.length > 0) {
    allListItems.forEach((name_list) => {
      const list_item = document.createElement("option");
      list_item.value = name_list;
      list_item.text = name_list;
      listAreaOfActivity.append(list_item);
    });
  } else {
  }
}

// Alle Listen in localStorage speichern
function saveLists() {
  const listItemsJson = JSON.stringify(allListItems);
  localStorage.setItem("listItems", listItemsJson);
}

//*************************************************

// Create table for activities
const tableDiv = document.createElement("div");
addTableActivites();

function addTableActivites() {
  createTableActivities();
  mainArea.append(tableDiv);
}

function createTableActivities() {
  tableDiv.className = "display";
  tableDiv.innerHTML = `
   <h2>Erfasste Tätigkeiten</h2>
        <div class="overflow-x-auto m-w-full">
          <table>
            <thead class="sticky-5">
              <tr>
                <th>Datum <br />Tätigkeit</th>
                <th>Zeit</th>
                <th>Dauer</th>
                <th>Betrag</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody id="activity-table">
              <!-- Ab hier per JS einfügen -->
              <!-- Start Eintrag -->
          
              
              <!-- Ende Eintrag -->
            </tbody>
            <tfoot>
              <tr>
                <td>Gesamt</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
  `;
  return tableDiv;
}

//*************************************************

// Add Item to table
//updateActivityList();

let allActivityItems = getAllActivityItems();

updateActivityList();
console.table(allActivityItems);
console.log(allActivityItems.length);

function getAllActivityItems() {
  try {
    return JSON.parse(localStorage.getItem("activityItems")) || [];
  } catch {
    return [];
  }
}

function saveActivities() {
  const listActivityItems = JSON.stringify(allActivityItems);
  localStorage.setItem("activityItems", listActivityItems);
}

function updateActivityList() {
  if (allActivityItems.length >= 0) {
    allActivityItems.forEach((activity) => {
      const activityTable = document.getElementById("activity-table");
      const activityItem = createActivityItem();
      activityTable.append(activityItem);
    });
  }
}

function createActivityItem() {
  const activityItemTr = document.createElement("tr");
  activityItemTr.innerHTML = `
                <td>
                  <div class="mg-bot-4">03.08.26</div>    
                  <div class="text-secondary">Programmieren</div>
                </td>
                <td>
                  <div class="mg-bot-4">07:00 - 12:00</div>
                  <div class="text-secondary">Pause: 15 Min.</div>
                </td>
                <td>4,75 Std.</td>
                <td>71,25€</td>
                <td>
                  <div class="td-del">
                    <button type="button" class="icon-button edit-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill=""
                      >
                        <path
                          d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>

                <td>
                  <div class="td-del">
                    <button type="button" class="icon-button delete-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill=""
                      >
                        <path
                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              `;
  return activityItemTr;
}

//*************************************************

addTestActivity();
function addTestActivity() {
  let testmode = true;
  let i = 0;
  let x = 15;
  if (testmode === true) {
    for (i; i < x; i++) {
      updateActivityList();
    }
  }
}

//*************************************************
//*************************************************

// Hier weiter machen mit dem Objekt ins Array briungen und das Array dann speichern und in den LocalStorage bringen

//*************************************************
//*************************************************

function addNewActivity() {
  let activity = {
    list: "",
    date: "",
    doing: "",
    beginn: "",
    end: "",
    pause: "",
    duration: "",
    costPerHour: "",
    amountCost: "",
  };
  allActivityItems.push(activity);
}

//*************************************************

/*
              <tr>
                <td>
                  <div class="mg-bot-4">03.08.26</div>
                  <div class="text-secondary">Programmieren</div>
                </td>
                <td>
                  <div class="mg-bot-4">07:00 - 12:00</div>
                  <div class="text-secondary">Pause: 15 Min.</div>
                </td>
                <td>4,75 Std.</td>
                <td>71,25€</td>
                <td>
                  <div class="td-del">
                    <button type="button" class="icon-button edit-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill=""
                      >
                        <path
                          d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>

                <td>
                  <div class="td-del">
                    <button type="button" class="icon-button delete-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill=""
                      >
                        <path
                          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
*/

// Funktionen Add new list item

//Öffnen des Dialogfenster
openDialogAddNewActivityAreaButton.addEventListener("click", () => {
  addAreaOfActivityDialog.showModal();
});

// Speichern einer neuen Liste mit Schließen des Dialogfenster
closeDialogAddNewActivityAreaButton.addEventListener("click", () => {
  pushNewListItem();
  //addListItemModalClose();
});

// Schließen des Dialogfenster ohne hinzufüügen einer neuen Liste
closeDialogAddNewActivityAreaWithoutButton.addEventListener("click", () => {
  addListItemModalClose();
});

// Schließen des Dialogfenster
function addListItemModalClose() {
  addAreaOfActivityDialog.close();
}

//Hinzufügen einer neuen Liste
function pushNewListItem() {
  const name_new_list = nameNewActivityListItem.value.trim();
  if (name_new_list.length > 0) {
    const listItemName = name_new_list;
    if (allListItems.includes(listItemName)) {
      alert("Liste " + listItemName + " bereits vorhanden");
    } else {
      allListItems.push(listItemName);
      saveLists();
      updateListItems();
      nameNewActivityListItem.value = "";
      addListItemModalClose();
    }
  } else {
    warning_modal_open();
  }
}

//*************************************************

//Warnmeldung ausgeben, wenn beim Hinzufügen einer neuen Liste kein Name eingegeben wurde
const warning = document.getElementById("warning");

// Öffnen des Dialogfenster Warnung
function warning_modal_open() {
  warning.showModal();
}

closeDialogWarningButton.addEventListener("click", () => {
  warningModalClose();
});
closeDialogWarningEndButton.addEventListener("click", () => {
  warningModalCloseEnd();
});
// Schließen des Dialogfenster Warnung
function warningModalClose() {
  warning.close();
  //addAreaOfActivityDialog.showModal();
}
function warningModalCloseEnd() {
  warning.close();
  addListItemModalClose();
}

//*************************************************
//Lösche Listen
const deleteListBt = document.getElementById("deleteListBt");
const deleteList = document.getElementById("deleteList");
const deleteListDialog = document.getElementById("deleteListDialog");

deleteListBt.addEventListener("click", () => {
  selectAllLists();
});

function selectAllLists() {
  deleteList.innerHTML = "";
  allListItems.forEach((listItem, listItemIndex) => {
    const listItemDel = createDelItem(listItem, listItemIndex);
    deleteList.append(listItemDel);
  });
  deleteListDialog.showModal();
}

function createDelItem(listItem, listItemIndex) {
  const itemID = "listItem-" + listItemIndex;
  const itemLI = document.createElement("div");
  const itemText = listItem;
  itemLI.className = "deleteItem w-full";
  itemLI.innerHTML = `
  <li id="${itemID}">
        <div class="card-3">
          <div class="flex1">${itemText}</div>
          <button class="icon-button delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </div>
      </li>
  `;

  const deleteButton = itemLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteListItem(listItemIndex);
  });

  return itemLI;
}

closeDialogDeleteListButton.addEventListener("click", () => deleteListDialog.close());

function deleteListItem(listItemIndex) {
  allListItems = allListItems.filter((_, i) => i !== listItemIndex);
  saveLists();
  updateListItems();
  selectAllLists();
}
//*************************************************

//*************************************************
// Tätigkeiten speichern

// Welche Infos werden gespeichert

// 1. Datum
// 2. Tätigkeit
// 3. Uhrzeit von bis
// 4. Pause
// 5. Dauer gesamt
// 6. Betrag

//*************************************************

//*************************************************
// Dauer berechnen
//*************************************************

//*************************************************
// Betrag berechnen
//*************************************************

//*************************************************
// Tätigkeiten laden
//*************************************************

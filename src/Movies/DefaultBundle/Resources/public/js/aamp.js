/*
  * Send Ajax call to the back end to add new contact
  */ 
function addContact() {
  $.ajax({
      type: "GET",
      url: "ajax.php?",
      data: {
        method: "new",
        name: $("#name_form").val(),
        email: $("#email_form").val()
      }
    })
    .done(function(msg) {
      $("#dialog").dialog();
      dialog.dialog("close");
      $('[name="refresh"]').click();
    });
  return true;
}

/*
  * Send Ajax call to the back end to edit new contact
  */ 
function editContact() {
  $.ajax({
      type: "GET",
      url: "ajax.php?",
      data: {
        method: "update",
        name: $("#edit_name_form").val(),
        email: $("#edit_email_form").val(),
        id: $("#edit_id_form").val()
      }
    })
    .done(function(msg) {
      $("#dialog").dialog();
      dialog_edit.dialog("close");
      $('[name="refresh"]').click();
    });
  return true;
}

/*
  * Add effects to the "Create Contact Dialog box"
  */
$("#dialog").dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  }
});

/*
  * "Create Contact"  dialog box specifications
  */
dialog = $("#dialog-form").dialog({
  autoOpen: false,
  height: 300,
  width: 350,
  modal: true,
  buttons: {
    "Create Contact": addContact,
    Cancel: function() {
      dialog.dialog("close");
    }
  },
  close: function() {
    dialog.dialog("close");
  }
});

/*
  * "Edit Contact" dialog box specifications
  */
dialog_edit = $("#edit-form").dialog({
  autoOpen: false,
  height: 300,
  width: 350,
  modal: true,
  buttons: {
    "Edit Contact": editContact,
    Cancel: function() {
      dialog_edit.dialog("close");
    }
  },
  close: function() {
    dialog_edit.dialog("close");
  }
});

/*
  * "Create Contact"  button on click action
  */
$("#new_contact").button().on("click", function() {
  dialog.dialog("open");
})

/*
  * Edit row on manager Table
  */
function operateFormatter(value, row, index) {
  return [
    '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
    '<i class="glyphicon glyphicon-edit"></i>',
    '</a>',
    '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
    '<i class="glyphicon glyphicon-remove"></i>',
    '</a>'
  ].join('');
}

/*
  * Control events of manager table 
  */
window.operateEvents = {
  'click .edit': function(e, value, row, index) {
    console.log(value, row, index);
    $("#edit_name_form").val(row["name"])
    $("#edit_email_form").val(row["email"])
    $("#edit_id_form").val(row["id"])
    dialog_edit.dialog("open");
  },
  'click .remove': function(e, value, row, index) {
    $.ajax({
      type: "GET",
      url: "ajax.php?",
      data: {
        method: "delete",
        id: row["id"]
      }
    });
    $("#dialog").dialog();
    dialog.dialog("close");
    $('[name="refresh"]').click();
  }
};
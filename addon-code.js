function getContextualAddOn(e) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Report Phishing"))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newTextParagraph().setText("Report this email as phishing.")
        )
        .addWidget(
          CardService.newTextInput()
            .setFieldName("reason")
            .setTitle("Optional: Why do you believe this is phishing?")
            .setHint("Provide your reason for reporting this email")
            .setMultiline(true)  // Make it multi-line
        )
        .addWidget(
          CardService.newTextParagraph().setText("This email will be moved to trash and its content will be reported as a phishing attempt to the security team for investigation, thank you.")
        )
        .addWidget(
          CardService.newTextButton()
            .setText("Report")
            .setOnClickAction(
              CardService.newAction().setFunctionName("reportEmail")
            )
        )
    )
    .build();
}

function reportEmail(e) {
  const messageId = e.gmail.messageId;

  if (!messageId) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText("No email selected."))
      .build();
  }

  // Get the email message
  const message = GmailApp.getMessageById(messageId);
  const subject = "Phishing Report: " + message.getSubject();
  const sender = message.getReplyTo();
  const fromName = message.getFrom();
  const recipient = message.getTo();
  const dateReceived = message.getDate();
  const userReason = e.formInput.reason;
  const bodyContent = message.getBody();
  const reportTo = ""; // Enter the email address where this should be reported

  // Email content
  const reportBody = 
    "<p>A potential phishing email has been reported.</p>" +
    "<h3> !! Original Email Details:</h3>" +
    "<ul>" +
    "<li><strong>Reason given by user:</strong> " + userReason + "</li>" +
    "<li><strong>Message ID:</strong> " + messageId + "</li>" +
    "<li><strong>Received:</strong> " + dateReceived + "</li>" +
    "<li><strong>From:</strong> " + sender + "</li>" +
    "<li><strong>From name:</strong> " + fromName + "</li>" +
    "<li><strong>To:</strong> " + recipient + "</li>" +
    "<li><strong>Subject:</strong> " + message.getSubject() + "</li>" +
    "</ul>" +
    "<h3> !! Message Content:</h3>" +
    bodyContent + 
    "<p><strong> !! Please review the email and its attachments for further analysis. !! </strong></p>";

  // Send the phishing report email
  GmailApp.sendEmail(reportTo, subject, "", {
    htmlBody: reportBody,
    attachments: message.getAttachments(),
    from: Session.getActiveUser().getEmail()
  });

  message.moveToTrash(); // Moves email to trash

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText("Email reported successfully and moved to trash."))
    .build();
}

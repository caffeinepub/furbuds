import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type PetType = {
    #dog;
    #cat;
    #other;
  };

  type ServiceType = {
    #onlineVetConsultation;
    #atHomeTreatment;
    #atHomeGrooming;
    #clinicGrooming;
  };

  type AppointmentStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Appointment = {
    petName : Text;
    petType : PetType;
    ownerName : Text;
    phone : Text;
    email : Text;
    service : ServiceType;
    preferredDate : Text;
    preferredTimeSlot : Text;
    notes : Text;
    status : AppointmentStatus;
    timestamp : Time.Time;
  };

  module Appointment {
    public func compare(a : Appointment, b : Appointment) : Order.Order {
      Text.compare(a.timestamp.toText(), b.timestamp.toText());
    };
  };

  public type ContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactMessage {
    public func compare(cm1 : ContactMessage, cm2 : ContactMessage) : Order.Order {
      Text.compare(cm1.timestamp.toText(), cm2.timestamp.toText());
    };
  };

  let appointments = Map.empty<Nat, Appointment>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextAppointmentId = 0;
  var nextMessageId = 0;

  public shared ({ caller }) func submitAppointment(appointment : Appointment) : async Nat {
    let id = nextAppointmentId;
    let newAppointment : Appointment = {
      appointment with
      timestamp = Time.now();
      status = #pending;
    };
    appointments.add(id, newAppointment);
    nextAppointmentId += 1;
    id;
  };

  public shared ({ caller }) func submitContactMessage(contactMessage : ContactMessage) : async Nat {
    let id = nextMessageId;
    let newMessage : ContactMessage = {
      contactMessage with
      timestamp = Time.now();
    };
    contactMessages.add(id, newMessage);
    nextMessageId += 1;
    id;
  };

  public shared ({ caller }) func updateAppointmentStatus(appointmentId : Nat, newStatus : AppointmentStatus) : async () {
    switch (appointments.get(appointmentId)) {
      case (null) { Runtime.trap("Appointment not found") };
      case (?appointment) {
        let updatedAppointment : Appointment = {
          appointment with
          status = newStatus;
        };
        appointments.add(appointmentId, updatedAppointment);
      };
    };
  };

  public query ({ caller }) func getAppointmentsByEmail(email : Text) : async [Appointment] {
    let filteredAppointments = List.empty<Appointment>();
    for ((_, appointment) in appointments.entries()) {
      if (appointment.email == email) {
        filteredAppointments.add(appointment);
      };
    };
    filteredAppointments.toArray().sort();
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray().sort();
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray().sort();
  };
};

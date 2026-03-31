import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface Appointment {
    service: ServiceType;
    status: AppointmentStatus;
    ownerName: string;
    email: string;
    preferredTimeSlot: string;
    petName: string;
    petType: PetType;
    preferredDate: string;
    notes: string;
    timestamp: Time;
    phone: string;
}
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum PetType {
    cat = "cat",
    dog = "dog",
    other = "other"
}
export enum ServiceType {
    onlineVetConsultation = "onlineVetConsultation",
    clinicGrooming = "clinicGrooming",
    atHomeTreatment = "atHomeTreatment",
    atHomeGrooming = "atHomeGrooming"
}
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAppointmentsByEmail(email: string): Promise<Array<Appointment>>;
    submitAppointment(appointment: Appointment): Promise<bigint>;
    submitContactMessage(contactMessage: ContactMessage): Promise<bigint>;
    updateAppointmentStatus(appointmentId: bigint, newStatus: AppointmentStatus): Promise<void>;
}

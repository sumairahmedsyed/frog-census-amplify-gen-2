import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const client = generateClient<Schema>();

type Report = Schema['report']['type'];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class HomePageComponent implements OnInit {

  reportForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  soundPreview: string | null = null;
  selectedImage: File | null = null;
  selectedSound: File | null = null;

  ngOnInit(): void {
    this.initForm();
    this.listReports();
  }

  initForm() {
    this.reportForm = new FormGroup({
      photo: new FormControl(''),
      sound: new FormControl(''),
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedSound = file;
      this.reportForm.get('sound')?.updateValueAndValidity();
      this.soundPreview = URL.createObjectURL(file);
    }
  }

  listReports() {
    try {
      client.models.report.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          console.log('reports:', items);
          console.log('isSynced:', isSynced);
        },
      });
    } catch (error) {
      console.error('error subscribing to reports', error);
    }
  }

  addReport() {
    try {
      const photo = this.selectedImage;
      console.log('photo:', photo);
      const sound = this.selectedSound;
      console.log('sound:', sound);
      client.models.report.create({
        comments: 'This is a test report',
        datecreated: new Date().getTime(),
        datereported: new Date().getTime(),
        datelastupdated: new Date().getTime(),
        photos: photo ? [{ filepath: photo.name, filesize: photo.size }] : [],
      })
    } catch (error) {
      console.error('error subscribing to create reports', error);
    }
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { uploadData } from 'aws-amplify/storage';

const client = generateClient<Schema>();

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
        try {
          uploadData({
            path: 'image-submissions/' + file.name,
            data: file,
            options: {
              bucket: 'frog-census-amplify-gen-2-storage',
            }
          });
        } catch (error) {
          console.error('error uploading image to storage', error);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onAudioSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedSound = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.reportForm.get('sound')?.updateValueAndValidity();
        this.soundPreview = URL.createObjectURL(file);
        try {
          uploadData({
            path: 'sound-submissions/' + file.name,
            data: file,
            options: {
              bucket: 'frog-census-amplify-gen-2-storage',
            }
          })
        } catch (error) {
          console.error('error uploading sound to storage', error);
        }
      };
      reader.readAsDataURL(file);
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

  async addReport() {
    try {
      const photo = this.selectedImage;
      console.log('photo:', photo);
      const { data: photoObj} = await client.models.reportphoto.create({
        filepath: photo ? photo.name : '',
        filesize: photo ? photo.size : 0,
      });
      const sound = this.selectedSound;
      console.log('sound:', sound);
      const { data: soundObj } = await client.models.reportsound.create({
        filepath: sound ? sound.name : '',
        filesize: sound ? sound.size : 0,
        soundstarttime: new Date().getTime(),
        soundendtime: new Date().getTime(),
      });
      const { data: report } = await client.models.report.create({
        comments: 'This is a test report',
        datecreated: new Date().getTime(),
        datereported: new Date().getTime(),
        datelastupdated: new Date().getTime(),
      });

      if (photo) {
        await client.models.reportphoto.update({
          id: report?.id || '',
        });
      }
      if (sound) {
        await client.models.reportsound.update({
          id: report?.id || '',
        });
      }
      console.log('report created:', report);
    } catch (error) {
      console.error('error subscribing to create reports', error);
    }
  }
}

from django.core.management.base import BaseCommand
from leaf_lens_app.models import Leaf, LeafBenefit, LeafUse, LeafCharacteristic, LeafCultivation, LeafPrecaution, LeafRecognitionHistory
from .plant_information import plants_data
from django.core.files import File
import os

class Command(BaseCommand):
    help = 'Populates the database with initial leaf data'
    

    def handle(self, *args, **options):
        self.stdout.write('Starting to populate leaf data...')

        # Clear existing data
        for image in Leaf.objects.all():
            image.image.delete(save=False)
        Leaf.objects.all().delete()
        LeafRecognitionHistory.objects.all().delete()

        # Counter for tracking added/skipped plants
        added_count = 0
        skipped_count = 0
        skipped_plants = []
        IMAGE_FOLDER_PATH = os.path.join(os.path.dirname(__file__), './PLANT_IMAGES')

        if not os.path.isdir(IMAGE_FOLDER_PATH):
            self.stdout.write(f"\nERROR: Image folder not found at '{IMAGE_FOLDER_PATH}'.")
            self.stdout.write("Please update the IMAGE_FOLDER_PATH variable in the script.")
            self.stdout.write("Skipping image assignment.")

        def find_image_for_plant(plant_name, folder_path):
            """Tries to find an image file matching the plant name in the given folder."""
            possible_extensions = ['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.JPG']

            name_variations = [
                plant_name,
                plant_name.lower(),
                plant_name.upper(),
            ]
            for name_var in name_variations:
                for ext in possible_extensions:
                    potential_file = os.path.join(folder_path, f"{name_var}{ext}")
                    if os.path.exists(potential_file) and os.path.isfile(potential_file):
                        print(f"    Found match: {potential_file}")
                        return potential_file
            self.stdout.write(self.style.WARNING(f"    No image found for variations of '{plant_name}'"))
            return None

        # Loop through the plant data and create database entries
        for plant_data in plants_data:
            self.stdout.write(f"Processing: {plant_data['name']}...")

            try:

                leaf = Leaf.objects.create(
                    name=plant_data['name'],
                    scientific_name=plant_data['scientific_name'],
                    family=plant_data['family'],
                    native_region=plant_data['native_region'],
                    leaf_type=plant_data['classification'], 
                    summary=plant_data['summary'],
                )

                # Add related benefits
                for benefit_desc in plant_data.get('benefits', []):
                    LeafBenefit.objects.create(leaf=leaf, description=benefit_desc)

                # Add related characteristics
                for char_desc in plant_data.get('characteristics', []):
                    LeafCharacteristic.objects.create(leaf=leaf, description=char_desc)

                # Add related cultivation info
                for cult_desc in plant_data.get('cultivation', []):
                    LeafCultivation.objects.create(leaf=leaf, description=cult_desc)

                # Add related precautions
                for prec_desc in plant_data.get('precautions', []):
                    LeafPrecaution.objects.create(leaf=leaf, description=prec_desc)

                # Add related uses
                for use_data in plant_data.get('uses', []):
                    LeafUse.objects.create(
                        leaf=leaf,
                        category=use_data.get('category', 'General'), # Default category if missing
                        description=use_data['description']
                    )

                # Add image if available
                if os.path.isdir(IMAGE_FOLDER_PATH):
                    image_path = find_image_for_plant(plant_data['name'], IMAGE_FOLDER_PATH)
                    if image_path:
                        try:
                            with open(image_path, 'rb') as img_file:
                                base_filename = os.path.basename(image_path)
                                leaf.image.save(base_filename, File(img_file), save=True)
                            self.stdout.write(f"--- Image assigned: {base_filename} to {leaf.name}")
                        except Exception as e:
                            self.stdout.write(self.style.ERROR(f"--- Error assigning image to {leaf.name}: {e}"))
                    else:
                        self.stdout.write(f"--- No matching image found for {leaf.name}.")

                self.stdout.write(f"--- Added: {leaf.name}")
                added_count += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"--- Error adding {plant_data['name']}: {e}"))
                skipped_count += 1
                skipped_plants.append(f"{plant_data['name']} (Error: {e})")
                if 'leaf' in locals() and leaf.pk:
                    leaf.delete()

        self.stdout.write("\n--------------------")
        self.stdout.write(f"Population script finished.")
        self.stdout.write(f"Successfully added: {added_count} plants.")
        self.stdout.write(f"Skipped: {skipped_count} plants.")
        if skipped_plants:
            self.stdout.write("Skipped/Errored Plants:")
            for p in skipped_plants:
                self.stdout.write(f"- {p}")
        self.stdout.write("--------------------")

        self.stdout.write(self.style.SUCCESS('Successfully populated leaf data'))

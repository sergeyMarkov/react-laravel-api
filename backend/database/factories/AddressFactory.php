<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class AddressFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			'line1' => fake()->address(),
			'city' => fake()->city(),
			'postalCode' => fake()->postcode(),
			'countryCode' => fake()->countryCode(),
			'stateCode' => fake()->postcode(),
			'stateName' => fake()->country(),
			'created_at' => fake()->dateTime(),
			'updated_at' => fake()->dateTime(),
			'user_id' => '97d224d7-7df2-4aa6-b116-3deef04c175b',
		];
	}
}

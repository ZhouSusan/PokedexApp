import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  pokemons: any[] = [];

  constructor(
    private dataService : DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getPokemons()
    .subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.dataService.getMorePokemoneData(result.name)
          .subscribe((unqiueResponse: any) => {
            this.pokemons.push(unqiueResponse);
            console.log(this.pokemons);
          })
      })
    })
  }
}

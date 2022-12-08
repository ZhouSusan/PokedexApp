import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;//page value
  totalPokemons: number | undefined;

  constructor(
    private dataService : DataService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  //Get Pokemons
  getPokemons() {
    this.dataService.getPokemons(10, this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemons = response.count;

      response.results.forEach((result: any) => {
        this.dataService.getMorePokemoneData(result.name)
          .subscribe((unqiueResponse: any) => {
            this.pokemons.push(unqiueResponse);
            console.log(this.pokemons);
          });
      });
    })
  };
}
